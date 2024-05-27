-- CreateTable
CREATE TABLE "Task" (
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
