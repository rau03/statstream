"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const addTask = useMutation(api.tasks.add);
  const [newTaskText, setNewTaskText] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!newTaskText) return;
    addTask({ text: newTaskText });
    setNewTaskText("");
  }

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">StatStream Test</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task"
          className="border rounded p-2 flex-grow"
        />
        <Button type="submit" disabled={!newTaskText}>
          Add Task
        </Button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Tasks from Convex:</h2>
      <ul>
        {tasks?.map(({ _id, text }) => (
          <li key={_id} className="p-2 border-b">
            {text}
          </li>
        ))}
      </ul>
    </main>
  );
}
