/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaClient} from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const sharedRouter = createTRPCRouter({
  postShared: protectedProcedure.input(
    z.object({
      userId: z.string()
    }),
  )
  .mutation(async ({ input, ctx }: {input:{userId:string},ctx:{session:any,prisma:PrismaClient}}) => {
    try {
      if (input.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You cannot share someone else's timesheet",
        });
      }
      const created = await ctx.prisma.shared.create({
        data: {
          userId: input.userId
        },
      })
      console.log(created);
      return created
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
  getShared: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.session.user.id;
      const shared = await ctx.prisma.shared.findMany({
        where: {
          userId: userId,
        },
      });
      console.log(shared);
      if (shared.length === 0) {
        return [];
      }
      return shared;
    } catch {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
  getSharedPublic: publicProcedure.input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    try {
      const shared = await ctx.prisma.shared.findMany({
        where: {
          id: input.id,
        },
      });
      if (shared.length === 0) {
        return [];
      }
      return shared;
    } catch {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
});