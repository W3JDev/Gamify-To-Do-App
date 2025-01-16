// src/services/gamification.js
class GamificationService {
  static POINTS = {
    TASK_COMPLETION: 10,
    HABIT_STREAK: 5,
    DAILY_LOGIN: 2
  };

  static LEVELS = [
    { level: 1, pointsNeeded: 0 },
    { level: 2, pointsNeeded: 100 },
    { level: 3, pointsNeeded: 250 },
    { level: 4, pointsNeeded: 500 },
    { level: 5, pointsNeeded: 1000 }
  ];

  static BADGES = {
    TASK_MASTER: {
      id: 'task_master',
      name: 'Task Master',
      description: 'Complete 50 tasks',
      requirement: 50
    },
    HABIT_HERO: {
      id: 'habit_hero',
      name: 'Habit Hero',
      description: 'Maintain a 30-day streak',
      requirement: 30
    },
    EARLY_BIRD: {
      id: 'early_bird',
      name: 'Early Bird',
      description: 'Complete 5 tasks before 9 AM',
      requirement: 5
    }
  };

  static calculateLevel(points) {
    for (let i = this.LEVELS.length - 1; i >= 0; i--) {
      if (points >= this.LEVELS[i].pointsNeeded) {
        return this.LEVELS[i].level;
      }
    }
    return 1;
  }

  static async awardPoints(userId, action) {
    try {
      const points = this.POINTS[action] || 0;
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/${userId}/points`, {
        points,
        action
      });
      return response.data;
    } catch (error) {
      console.error('Error awarding points:', error);
      throw error;
    }
  }

  static checkBadgeEligibility(stats) {
    const eligibleBadges = [];
    
    if (stats.completedTasks >= this.BADGES.TASK_MASTER.requirement) {
      eligibleBadges.push(this.BADGES.TASK_MASTER);
    }
    
    if (stats.longestStreak >= this.BADGES.HABIT_HERO.requirement) {
      eligibleBadges.push(this.BADGES.HABIT_HERO);
    }
    
    if (stats.earlyTasksCompleted >= this.BADGES.EARLY_BIRD.requirement) {
      eligibleBadges.push(this.BADGES.EARLY_BIRD);
    }
    
    return eligibleBadges;
  }
}

export default GamificationService;
