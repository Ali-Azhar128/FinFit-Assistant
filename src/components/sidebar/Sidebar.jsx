import { Package, Bell, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Sidebar({ goals }) {
  return (
    <div className="hidden h-[100vh] border-r bg-muted/40 md:block w-[20%] fixed left-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span className="">Personal Goals</span>
          </Link>
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Goals</h2>
              <ul className="list-disc pl-5">
                {goals.map((goal, index) => (
                  <li key={index} className="text-muted-foreground">
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}