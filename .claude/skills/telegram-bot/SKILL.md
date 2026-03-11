---
name: telegram-bot
description: Telegram Bot API patterns and reference. Use when building Telegram bots, handling updates, sending messages, working with inline keyboards, webhooks, or any Telegram Bot API integration.
---

# Telegram Bot API

## Base URL & Authentication
```
https://api.telegram.org/bot<TOKEN>/METHOD_NAME
```
Token format: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11` (from @BotFather)

## Request Format
- GET or POST, JSON body (`application/json`) or `multipart/form-data` (file uploads)
- Response: `{ ok: boolean, result: T, description?: string }`

## Getting Updates

### Polling (simple, good for development)
```ts
// Long polling
const getUpdates = async (offset = 0) => {
  const res = await fetch(`${BOT_URL}/getUpdates?offset=${offset}&timeout=30`);
  const { result } = await res.json();
  for (const update of result) {
    await handleUpdate(update);
    offset = update.update_id + 1;
  }
  return getUpdates(offset); // recursive loop
};
```

### Webhook (production — use this)
```ts
// Set webhook (call once)
await fetch(`${BOT_URL}/setWebhook`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    url: "https://yourdomain.com/api/telegram/webhook",
    secret_token: process.env.TELEGRAM_WEBHOOK_SECRET,
  }),
});

// Express handler
app.post("/api/telegram/webhook", (req, res) => {
  const secret = req.headers["x-telegram-bot-api-secret-token"];
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) return res.sendStatus(403);
  handleUpdate(req.body);
  res.sendStatus(200); // respond fast, process async
});
```
Supported ports: 443, 80, 88, 8443. Must be HTTPS.

## Core Methods

### Sending Messages
```ts
// Text message
await bot("sendMessage", {
  chat_id: chatId,
  text: "Hello!",
  parse_mode: "HTML", // or "MarkdownV2"
});

// With inline keyboard
await bot("sendMessage", {
  chat_id: chatId,
  text: "Choose an option:",
  reply_markup: {
    inline_keyboard: [
      [{ text: "Option A", callback_data: "opt_a" }, { text: "Option B", callback_data: "opt_b" }],
      [{ text: "Visit Site", url: "https://example.com" }],
    ],
  },
});

// Photo
await bot("sendPhoto", {
  chat_id: chatId,
  photo: "https://example.com/image.jpg", // URL or file_id
  caption: "Check this out!",
});

// Document, Video, Audio — same pattern
await bot("sendDocument", { chat_id: chatId, document: fileIdOrUrl });
await bot("sendVideo", { chat_id: chatId, video: fileIdOrUrl });
await bot("sendLocation", { chat_id: chatId, latitude: 40.7, longitude: -74.0 });
```

### Editing Messages
```ts
await bot("editMessageText", {
  chat_id: chatId,
  message_id: msgId,
  text: "Updated text",
  reply_markup: { inline_keyboard: [[]] }, // update buttons too
});

await bot("deleteMessage", { chat_id: chatId, message_id: msgId });
```

### Answering Callbacks
```ts
// MUST answer every callback_query to remove loading state
await bot("answerCallbackQuery", {
  callback_query_id: query.id,
  text: "Done!", // optional toast notification
  show_alert: false, // true = modal alert
});
```

## Key Types

### Update
```ts
interface Update {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  callback_query?: CallbackQuery;
  inline_query?: InlineQuery;
  channel_post?: Message;
  my_chat_member?: ChatMemberUpdated;
}
```

### Message
```ts
interface Message {
  message_id: number;
  from?: User;
  chat: Chat;
  date: number; // Unix timestamp
  text?: string;
  entities?: MessageEntity[]; // bold, links, commands, etc.
  photo?: PhotoSize[];
  document?: Document;
  reply_to_message?: Message;
  reply_markup?: InlineKeyboardMarkup;
}
```

### Chat
```ts
interface Chat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
  first_name?: string;
}
```

### CallbackQuery
```ts
interface CallbackQuery {
  id: string;
  from: User;
  message?: Message;
  data?: string; // your callback_data
  chat_instance: string;
}
```

## Helper Pattern for This Project

```ts
// src/server/services/telegram.service.ts
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const BOT_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export async function bot(method: string, params: Record<string, unknown> = {}) {
  const res = await fetch(`${BOT_URL}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`Telegram API error: ${data.description}`);
  return data.result;
}
```

## Update Handler Pattern
```ts
// src/server/services/telegram.handler.ts
export async function handleUpdate(update: Update) {
  if (update.message?.text) {
    return handleMessage(update.message);
  }
  if (update.callback_query) {
    return handleCallback(update.callback_query);
  }
}

async function handleMessage(msg: Message) {
  const text = msg.text || "";
  const chatId = msg.chat.id;

  // Command routing
  if (text.startsWith("/start")) return bot("sendMessage", { chat_id: chatId, text: "Welcome!" });
  if (text.startsWith("/help")) return bot("sendMessage", { chat_id: chatId, text: "Commands: /start, /help" });

  // Default echo or AI response
  return bot("sendMessage", { chat_id: chatId, text: `You said: ${text}` });
}

async function handleCallback(query: CallbackQuery) {
  const chatId = query.message?.chat.id;
  const data = query.data;

  await bot("answerCallbackQuery", { callback_query_id: query.id });

  if (data === "opt_a") {
    await bot("editMessageText", {
      chat_id: chatId,
      message_id: query.message?.message_id,
      text: "You chose Option A!",
    });
  }
}
```

## Bot Commands Registration
```ts
// Set bot menu commands (call once at startup)
await bot("setMyCommands", {
  commands: [
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Show help" },
    { command: "settings", description: "Bot settings" },
  ],
});
```

## Inline Mode
```ts
// User types @yourbot query — respond with results
async function handleInlineQuery(query: InlineQuery) {
  await bot("answerInlineQuery", {
    inline_query_id: query.id,
    results: [
      {
        type: "article",
        id: "1",
        title: "Result Title",
        input_message_content: { message_text: "Selected result text" },
      },
    ],
    cache_time: 300,
  });
}
```

## Payments (Telegram Stars)
```ts
await bot("sendInvoice", {
  chat_id: chatId,
  title: "Premium Plan",
  description: "Monthly subscription",
  payload: "premium_monthly",
  currency: "XTR", // Telegram Stars
  prices: [{ label: "Premium", amount: 100 }],
});

// Handle in pre_checkout_query update
await bot("answerPreCheckoutQuery", {
  pre_checkout_query_id: query.id,
  ok: true,
});
```

## Parse Modes

### HTML
```html
<b>bold</b>, <i>italic</i>, <u>underline</u>, <s>strikethrough</s>
<a href="https://example.com">link</a>
<code>inline code</code>
<pre>code block</pre>
<pre><code class="language-python">print("hi")</code></pre>
<tg-spoiler>spoiler</tg-spoiler>
<blockquote>quote</blockquote>
```

### MarkdownV2
```
*bold*, _italic_, __underline__, ~strikethrough~
[link](https://example.com)
`inline code`
```pre block```
||spoiler||
> blockquote
```
Escape these characters: `_*[]()~` > #+-=|{}.!`

## Important Constraints
- Webhook: must be HTTPS, ports 443/80/88/8443
- File download: up to 20MB via getFile
- File upload: up to 50MB via multipart
- Message text: max 4096 characters
- Caption: max 1024 characters
- Inline results: max 50 per query
- Callback data: max 64 bytes
- Always answer callback queries (even with empty response)
- Update retention: 24 hours max

## Environment Variables
```env
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_WEBHOOK_SECRET=your-random-secret
TELEGRAM_WEBHOOK_URL=https://yourdomain.com/api/telegram/webhook
```
