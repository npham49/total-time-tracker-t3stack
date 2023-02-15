/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaClient} from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const timeRouter = createTRPCRouter({
  postTime: protectedProcedure.input(
    z.object({
      time: z.number(),
      date: z.date(),
      type: z.string(),
      note: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      //if the date is string then convert to date object
      const date = typeof input.date === "string" ? new Date(input.date) : input.date;
      await ctx.prisma.timeStamp.create({
        data: {
          time: input.time,
          date: date,
          type: input.type,
          note: input.note,
          userId: userId,
        },
      });
    } catch (error) { 
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
  getTime: protectedProcedure
  .input(
    z.object({
      page: z.number(),
    }),
  )
  .query(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      if (input.page < 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Page number cannot be less than 0",
        });
      }
      const timetotal = await ctx.prisma.timeStamp.count({
        where: {
          userId: userId,
        },
      });
      if (input.page * 10 > timetotal) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Page number is too high",
        });
      }
      const time = await ctx.prisma.timeStamp.findMany({
        skip: 10 * (input.page),
        take: 10,
        where: {
          userId: userId,
        },
        orderBy: {
          date: "desc",
        },
      });
      return time;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
  getTimePublic: publicProcedure
  .input(z.object({
    userId: z.string(),
    page: z.number(),
  })).query(async ({ input, ctx }) => {
    try {
      if (input.page < 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Page number cannot be less than 0",
        });
      }
      const timetotal = await ctx.prisma.timeStamp.count({
        where: {
          userId: input.userId,
        },
      });
      if (input.page * 10 > timetotal) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Page number is too high",
        });
      }
      const userAllowed = await ctx.prisma.shared.findMany({
        where: {
          userId: input.userId,
        },
      });
      if (userAllowed.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this timesheet",
        });
      }
      const time = await ctx.prisma.timeStamp.findMany({
        skip: 10 * (input.page),
        take: 10,
        where: {
          userId: input.userId,
        },
        orderBy: {
          date: "desc",
        },
      });
      return time;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
  deleteTime: protectedProcedure.input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }: {input:{id:string},ctx:{session:any,prisma:PrismaClient}}) => {
    try {
      const userId = ctx.session.user.id;
      const time = await ctx.prisma.timeStamp.findUnique({
        where: {
          id: input.id,
        },
      });
      if (time?.userId !== userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to delete this time",
        });
      }
      await ctx.prisma.timeStamp.delete({
        where: {
          id: input.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  })
});

