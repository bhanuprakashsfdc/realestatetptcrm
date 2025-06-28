
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Building, MapPin, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
        {/* Animated Building Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-purple-100">
            <Building className="w-24 h-24 mx-auto text-purple-600 animate-bounce" />
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent animate-scale-in">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 animate-slide-in-right">
            Property Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Looks like this property has been sold or moved to a different neighborhood. 
            Let's help you find what you're looking for.
          </p>
        </div>

        {/* Animated Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Explore Properties</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Search className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Search Listings</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/properties">
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
              <Building className="w-4 h-4 mr-2" />
              Browse Properties
            </Button>
          </Link>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-purple-200 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-300 rounded-full animate-bounce delay-300 opacity-40"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-700 opacity-50"></div>
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-purple-200 rounded-full animate-bounce delay-1000 opacity-30"></div>

        {/* Brand Message */}
        <div className="mt-12 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100">
          <p className="text-sm text-gray-500">
            Need help finding the perfect property? Our real estate experts are here to assist you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
