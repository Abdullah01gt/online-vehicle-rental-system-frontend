import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Calendar, IdCard, Eye, EyeOff } from 'lucide-react';

export default function UserCard({ userData = {} }) {
  const [showPassword, setShowPassword] = useState(false);

 
  const formatDOB = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

 
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'owner':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

 
  const getInitials = (name) => {
    return name ? name.slice(0, 2).toUpperCase() : "??";
  };

  return (
    <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-5 shadow-xl hover:border-gray-700/80 transition-all duration-300 space-y-4 flex flex-col justify-between">
      
     
      <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-sm tracking-wider">
            {getInitials(userData.user_name)}
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">{userData.user_name || "Unknown User"}</h3>
            <p className="text-[11px] text-gray-500 capitalize">{userData.gender || "Not specified"}</p>
          </div>
        </div>
        
        <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getRoleBadgeColor(userData.user_role)}`}>
          {userData.user_role || "User"}
        </span>
      </div>

  
      <div className="space-y-2.5 text-xs text-gray-400">
        
    
        <div className="flex items-center space-x-2">
          <Mail className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
          <span className="truncate text-gray-300">{userData.email_address}</span>
        </div>

      
        <div className="flex items-center space-x-2">
          <Phone className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
          <span className="text-gray-300 font-mono">{userData.contact_number || "N/A"}</span>
        </div>

   
        <div className="flex items-center space-x-2">
          <Calendar className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
          <span>DOB: <strong className="text-gray-300 font-medium">{formatDOB(userData.date_of_birth)}</strong></span>
        </div>

      
        <div className="flex items-center space-x-2">
          <IdCard className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
          <span>DL: <strong className="text-amber-500 font-mono tracking-wide uppercase">{userData.driving_license_id || "N/A"}</strong></span>
        </div>

      
        <div className="flex items-start space-x-2 pt-1 border-t border-gray-800/40 mt-1">
          <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed text-gray-400 text-[11px]">
            {userData.address || "No registered address placeholder available."}
          </p>
        </div>

      </div>

    
      <div className="bg-[#1a1d26] border border-gray-800/60 p-2.5 rounded-xl flex items-center justify-between text-xs mt-2">
        <div className="flex flex-col space-y-0.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-600">Encrypted Password String</span>
          <span className="font-mono text-gray-400 truncate max-w-[160px]">
            {showPassword ? userData.password : "••••••••••••••••"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition duration-150 cursor-pointer"
          title={showPassword ? "Hide Token String" : "Reveal Hash Token String"}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
}