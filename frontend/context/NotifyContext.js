import React, { createContext, useState } from 'react';


// context for forcing page rerenders
// to use, subscribe useEffects that need refreshing to lastUpdateTime, and call triggerRerender() from other pages
const NotifyContext = createContext();

function NotifyProvider({ children }) {
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  function triggerRerender() {
    setLastUpdateTime(new Date());
  }

  return (
    <NotifyContext.Provider value={{lastUpdateTime, triggerRerender}}>
      {children}
    </NotifyContext.Provider>
  )
}

export default NotifyContext; 
export { NotifyProvider }; 
