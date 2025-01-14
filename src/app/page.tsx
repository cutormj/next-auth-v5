import Post from "@/components/Post";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc' // Sort by createdAt field in descending order
    },
  });

  return (
    <main className="container mx-auto px-4 py-8 flex justify-center">
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.postId} className="p-4 rounded-md">
            <Post 
              title={post.title ?? ""}
              details={post.details ?? ""}
            />
            <Link href={`/post/${post.postId}`} className="hover:underline">
              <p className="text-blue-500 hover:text-blue-700">{post.title}</p>
            </Link>
            <div className="text-gray-600">Posted by: {post.user.name}</div>
            <div className="text-gray-600">Created at: {new Date(post.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
