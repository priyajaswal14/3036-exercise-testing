import { savePost } from "../actions/posts";
import { Post } from "../types";

interface AdminFormProps {
  post?: Post;
}

export function AdminForm({ post }: AdminFormProps) {
  return (
    <form action={savePost}>
      {post && (
        <input
          type="hidden"
          name="id"
          value={post.id}
        />
      )}

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={post?.title ?? ""}
          required
        />
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          defaultValue={post?.content ?? ""}
          required
        />
      </div>

      <div>
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          type="text"
          defaultValue={post?.tags.join(", ") ?? ""}
          placeholder="tech, lifestyle"
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
}