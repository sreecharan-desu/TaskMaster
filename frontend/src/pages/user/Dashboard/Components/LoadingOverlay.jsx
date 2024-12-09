export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 bg-gray-50/80 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    );
} 