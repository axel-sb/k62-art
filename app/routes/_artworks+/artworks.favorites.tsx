//import type { LoaderFunctionArgs } from "@remix-run/node";
//import { json, redirect } from "@remix-run/node";
//import { getUserId } from "~/modules/auth";
//import { requireUserId } from "app/session.server";

/* export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  if (!userId) return redirect("/login");
  return json({});
}; */

export default function Favorites() {
  return (
    <div>
      <h1 className="text-6xl font-bold">Favorites</h1>
    </div>
  );
}
