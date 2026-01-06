import { useEffect, useState } from "react";

export default function DailyResetApp() { const schedule = [ { time: "07:00", task: "Mirror tapping + gratitude (5–10 min)" }, { time: "09:00", task: "E-com Power Hour – money task" }, { time: "12:00", task: "Gratitude check-in (3 things)" }, { time: "16:00", task: "10 minutes present time with kids" }, { time: "20:30", task: "Night reflection & release" } ];

const [now, setNow] = useState(new Date()); const [permission, setPermission] = useState("default");

useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(timer); }, []);

useEffect(() => { if (permission === "granted") scheduleNotifications(); }, [permission]);

const currentTime = now.toTimeString().slice(0, 5);

const currentTask = schedule .filter(item => item.time <= currentTime) .slice(-1)[0]?.task || "You’re free right now 🌸";

const enableNotifications = async () => { if ("Notification" in window) { const result = await Notification.requestPermission(); setPermission(result); } };

const scheduleNotifications = () => { schedule.forEach(item => { const [h, m] = item.time.split(":"); const notifyTime = new Date(); notifyTime.setHours(h, m, 0); if (notifyTime < new Date()) notifyTime.setDate(notifyTime.getDate() + 1);

setTimeout(() => {
    new Notification("2026 Daily Reset", { body: item.task });
  }, notifyTime.getTime() - Date.now());
});

};

return ( <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4"> <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center"> <h1 className="text-2xl font-bold mb-2">🌱 2026 Daily Reset</h1> <p className="text-sm text-gray-500">Current time: {currentTime}</p> <div className="mt-6 text-lg font-medium">{currentTask}</div> <button
onClick={enableNotifications}
className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
> Enable Daily Reminders </button> </div> </div> ); }
