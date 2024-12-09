export function Warning() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Access Denied
                </h1>
                <p className="text-gray-600">
                    You need to sign in to access this page
                </p>
            </div>
        </div>
    );
} 