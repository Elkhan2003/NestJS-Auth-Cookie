-- CreateTable
CREATE TABLE "testTask" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "testTask_pkey" PRIMARY KEY ("id")
);
