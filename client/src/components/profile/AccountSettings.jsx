import React, { useState } from 'react'
import Tabs from '../common/Tabs';

function AccountSettings() {
    const [selectedTab, setSelectedTab] = useState("All");

    const tabs = [
        { id: "Personal Details", label: "Personal Details" },
        { id: "Address ", label: "Address " },
        { id: "Security", label: "Security" },
       
    ];
    return (
        <div>
           <div className="l mx-auto mt-2 px-">
      <Tabs tabs={tabs} onTabChange={setSelectedTab} />

      <div className="mt-6">
        {selectedTab === "profile" && <p>Profile content here...</p>}
        {selectedTab === "notifications" && <p>Notifications settings...</p>}
        {selectedTab === "accounts" && <p>Account details...</p>}
      </div>
    </div>
        </div>
    )
}

export default AccountSettings
