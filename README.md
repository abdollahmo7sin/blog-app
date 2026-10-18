# ✍️ مدونتي — Arabic Blog Platform

A full-stack Arabic (RTL) blog where users can sign up, write articles with cover images, and manage their own posts. It's built with React + TypeScript on top of Supabase (Postgres, Auth and Storage).

**🔗 Live demo:** [blog-app-fawn-eight-13.vercel.app](https://blog-app-fawn-eight-13.vercel.app/)

![Blog home page with a hero section and articles grouped by category](./screenshot.png)

## Features

- 🔐 **Authentication**: register, login and logout with Supabase Auth. The session survives a page refresh.
- 📝 **Full CRUD for articles**: create, edit and delete. Only the author sees the edit and delete buttons.
- 🖼️ **Image upload**: cover images go to Supabase Storage, with a preview before upload and size/type validation.
- 🛡️ **Row Level Security**: the database itself only lets authors change their own articles and images. Route guards in the UI are just for UX.
- 🗂️ **Blog page**: category filter and pagination, both kept in the URL (`?category=2&page=3`) so links are shareable.
- 🏠 **Home page**: the latest articles from every category, fetched in parallel.
- 📄 **Article page**: related articles from the same category.
- 👤 **My articles**: a dashboard of your own posts, with per-row delete state.
- ✅ **Forms**: validated with React Hook Form + Zod, with Arabic error messages.
- ⚡ **Caching**: React Query caches data and refreshes it automatically after any create, edit or delete.
- ⏳ **Loading states**: skeletons, empty states and error states with retry.
- 📱 **Responsive**: works from mobile to desktop.

## Tech Stack

- [React 19](https://react.dev/) (with the React Compiler) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) + [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query): server state, caching and mutations
- [Zustand](https://zustand.docs.pmnd.rs/): auth state
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/): forms and validation
- [Supabase](https://supabase.com/): Postgres, Auth, Storage and RLS

## Database

| Table        | Columns                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------- |
| `profiles`   | `id` (→ `auth.users`), `username`, `display_name`, `created_at`                           |
| `categories` | `id`, `title`                                                                             |
| `articles`   | `id`, `title`, `description`, `content`, `thumbnail`, `category_id`, `author_id`, `created_at` |

- A Postgres trigger creates the `profiles` row automatically on sign-up.
- Anyone can read articles. Only the author can insert, update or delete their own.
- Images live in a public `thumbnails` bucket, in one folder per user (`<user_id>/<file>`). Storage policies only allow uploads and deletes inside your own folder.

## Getting Started

1. Create a Supabase project, then create the tables and policies above.
2. Add a `.env.local` file in the project root:

   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```

3. Run it:

   ```bash
   npm install
   npm run dev      # start the dev server
   npm run build    # type-check and build for production
   ```

## Project Structure

```
src/
├── components/   # ArticleCard, Header, Pagination, GuestRoute, ProtectedRoute, skeletons
├── hooks/        # One React Query hook per query or mutation (useArticles, useCreateArticle, ...)
├── layouts/      # RootLayout (header + page + footer)
├── lib/          # Supabase client
├── pages/        # home, blog, article, articleForm (create + edit), myArticles, login, register
├── schemas/      # Zod schemas for the auth and article forms
├── services/     # All Supabase calls, split by table (articles, categories, auth, storage)
├── stores/       # Zustand auth store, synced with onAuthStateChange
├── types/        # Shared TypeScript types
└── utils/        # formatDate (Intl, ar-EG), pagination helpers
```

Data flows in one direction: **page → hook (React Query) → service (Supabase)**. The hooks also translate between the form's shape and the database's shape (for example, the uploaded file becomes a public image URL).

## What I Learned

- Designing a relational schema and protecting it with Row Level Security instead of trusting the frontend
- Supabase Auth and keeping auth state in sync with `onAuthStateChange`
- Uploading files to Storage and writing folder-based storage policies
- React Query mutations and cache invalidation with query-key prefixes
- Dependent queries (`enabled`) and parallel queries (`useQueries` + `combine`)
- Building one form for both create and edit: `reset()`, a separate edit schema, and route guards
- Keeping filters and pagination in the URL with `useSearchParams`
