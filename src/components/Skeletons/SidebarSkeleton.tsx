import Sidebar from "../common/Sidebar";

function SidebarSkeleton() {
  return (
    <Sidebar isOpen={true} onClose={() => {}}>
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2" />
        <div className="h-[200px] bg-gray-200 rounded" />
      </div>
    </Sidebar>
  );
}

export default SidebarSkeleton;
