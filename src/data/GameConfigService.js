// This service mimics the behavior of a Supabase client.
// It uses localStorage to persist data during the hackathon,
// but can be easily swapped with Supabase calls when credentials are ready.

const STORAGE_KEY = 'taptap_game_schedules';

// Initialize with some default mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const today = new Date().toISOString().split('T')[0];
    const initialData = [
      {
        date: today,
        gameId: 'runner',
        title: 'Two Sum Problem',
        desc: 'Find two numbers that add up to a target value. Test your array skills!',
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

initializeStorage();

const getSchedules = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
};

const saveSchedules = (schedules) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
};

export const GameConfigService = {
  // Fetch all schedules
  getAllSchedules: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: getSchedules(), error: null });
      }, 300); // Simulate network latency
    });
  },

  // Get the scheduled game for a specific date (YYYY-MM-DD)
  getScheduleForDate: async (dateString) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const schedules = getSchedules();
        const schedule = schedules.find(s => s.date === dateString);
        resolve({ data: schedule || null, error: null });
      }, 200);
    });
  },

  // Upsert a schedule for a date
  upsertSchedule: async (scheduleObj) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const schedules = getSchedules();
        const existingIndex = schedules.findIndex(s => s.date === scheduleObj.date);
        
        if (existingIndex >= 0) {
          schedules[existingIndex] = { ...schedules[existingIndex], ...scheduleObj };
        } else {
          schedules.push(scheduleObj);
        }
        
        // Keep them sorted by date
        schedules.sort((a, b) => new Date(a.date) - new Date(b.date));
        saveSchedules(schedules);
        
        resolve({ data: scheduleObj, error: null });
      }, 400);
    });
  },

  // Delete a schedule for a specific date
  deleteSchedule: async (dateString) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let schedules = getSchedules();
        schedules = schedules.filter(s => s.date !== dateString);
        saveSchedules(schedules);
        resolve({ data: true, error: null });
      }, 300);
    });
  }
};
