import { UserModel } from "../models/user.model.js";
import type { CreateUser, UpdateUser } from "@shared/schemas/user.schema.js";
import type { Pagination } from "@shared/schemas/common.schema.js";

export const userService = {
  async findAll(pagination: Pagination) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      UserModel.find().select("-password").skip(skip).limit(limit).lean(),
      UserModel.countDocuments(),
    ]);

    return {
      items: items.map((u) => ({ ...u, _id: u._id.toString() })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async findById(id: string) {
    const user = await UserModel.findById(id).select("-password").lean();
    if (!user) return null;
    return { ...user, _id: user._id.toString() };
  },

  async create(data: CreateUser) {
    const user = await UserModel.create(data);
    const { password: _, ...userWithoutPassword } = user.toObject();
    return { ...userWithoutPassword, _id: userWithoutPassword._id.toString() };
  },

  async update(id: string, data: UpdateUser) {
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true })
      .select("-password")
      .lean();
    if (!user) return null;
    return { ...user, _id: user._id.toString() };
  },

  async delete(id: string) {
    const result = await UserModel.findByIdAndDelete(id);
    return !!result;
  },
};
