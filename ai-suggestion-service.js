// src/services/aiSuggestions.js
class AISuggestionService {
  static SUGGESTION_TYPES = {
    NEW_HABIT: 'new_habit',
    PRODUCTIVITY_TIP: 'productivity_tip',
    MOTIVATION: 'motivation'
  };

  static async generateSuggestions(userData) {
    const { completedTasks, habits, activityPatterns } = userData;
    
    // Analyze user behavior patterns
    const suggestions = [];
    
    // Suggest new habits based on completed tasks
    if (completedTasks.length > 0) {
      const taskCategories = this.analyzeTaskCategories(completedTasks);
      suggestions.push({
        type: this.SUGGESTION_TYPES.NEW_HABIT,
        content: this.generateHabitSuggestion(taskCategories)
      });
    }
    
    // Generate productivity tips based on activity patterns
    if (activityPatterns) {
      suggestions.push({
        type: this.SUGGESTION_TYPES.PRODUCTIVITY_TIP,
        content: this.generateProductivityTip(activityPatterns)
      });
    }
    
    // Generate motivational messages based on user progress
    suggestions.push({
      type: this.SUGGESTION_TYPES.MOTIVATION,
      content: this.generateMotivationalMessage(userData)
    });
    
    return suggestions;
  }

  static analyzeTaskCategories(tasks) {
    // Analyze task categories and return most common ones
    const categories = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(categories)
      .sort(([,a], [,b]) => b - a)
      .map(([category]) => category);
  }

  static generateHabitSuggestion(categories) {
    const habitSuggestions = {
      work: [
        'Take regular breaks using the Pomodoro Technique',
        'Plan tomorrow\'s tasks at the end of each day',
        'Start your day with the most important task'
      ],
      health: [
        'Drink water every hour',
        'Take a 10-minute walk after lunch',
        'Do quick stretching exercises every 2 hours'
      ],
      learning: [
        'Read for 15 minutes every morning',
        'Practice a new skill for 20 minutes daily',
        'Watch one educational video per day'
      ]
    };

    const topCategory = categories[0] || 'work';
    const suggestions = habitSuggestions[topCategory] || habitSuggestions.work;
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }

  static generateProductivityTip(patterns) {
    const tips = [
      'Try batching similar tasks together for better focus',
      'Use time-blocking to structure your day',
      'Set specific goals for each work session',
      'Create a dedicated workspace to boost productivity',
      'Use the 2-minute rule: if it takes less than 2 minutes, do it now'
    ];
    
    return tips[Math.floor(Math.random() * tips.length)];
  }

  static generateMotivationalMessage(userData) {
    const messages = [
      'You\'re making great progress! Keep going!',
      'Small steps lead to big achievements. You\'re doing great!',
      'Stay consistent - you\'re building amazing habits!',
      'Every task completed is a step toward your goals!',
      'Your dedication is inspiring. Keep up the fantastic work!'
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  }
}

export default AISuggestionService;
