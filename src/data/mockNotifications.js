export const initialNotifications = [
  {
    id: 'n1',
    type: 'Colleges',
    title: 'VNR VJIET takes the lead!',
    message: 'VNR VJIET students have surged to the top of the MazeMode charts today.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    read: false,
  },
  {
    id: 'n2',
    type: 'Leaderboard',
    title: 'Overall Leaderboard Updated',
    message: 'IIT Bombay is closing the gap in the overall scores. Check the new standings!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    read: false,
  },
  {
    id: 'n3',
    type: 'More Games',
    title: 'New Mode Available: Endurance',
    message: 'Test your raw logic under pressure in the new Survival Mode. Available now!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hrs ago
    read: true,
  },
  {
    id: 'n4',
    type: 'Games',
    title: 'Record Broken in Maze Escape!',
    message: 'User @kramer just cleared 50 nodes in under 2 minutes!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hrs ago
    read: true,
  },
  {
    id: 'n5',
    type: 'Admin',
    title: 'Hackathon Server Maintenance',
    message: 'Expect a short 5-minute downtime at midnight for server upgrades.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
  }
];

export const notificationCategories = ['All', 'Colleges', 'Games', 'More Games', 'Leaderboard', 'Admin'];
