import { router, publicProcedure, protectedProcedure } from "../trpc/trpc.js";
import { userService } from "../services/user.service.js";
import {
  createUserSchema,
  updateUserSchema,
} from "@shared/schemas/user.schema.js";
import { paginationSchema, idParamSchema } from "@shared/schemas/common.schema.js";

export const userRouter = router({
  list: publicProcedure
    .input(paginationSchema)
    .query(async ({ input }) => {
      return userService.findAll(input);
    }),

  getById: publicProcedure
    .input(idParamSchema)
    .query(async ({ input }) => {
      return userService.findById(input.id);
    }),

  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      return userService.create(input);
    }),

  update: protectedProcedure
    .input(idParamSchema.merge(updateUserSchema))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return userService.update(id, data);
    }),

  delete: protectedProcedure
    .input(idParamSchema)
    .mutation(async ({ input }) => {
      return userService.delete(input.id);
    }),
});
