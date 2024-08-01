const sleepRecommendations = {
  earlier_bedtime: [
    "Going to bed earlier can transform your mornings, providing you with the energy and focus needed to conquer the day.",
    "Embrace an earlier bedtime to sync with your natural circadian rhythm, enhancing your overall well-being and productivity.",
    "Prioritizing an earlier bedtime can lead to better quality sleep, helping you wake up refreshed and ready to tackle your goals.",
  ],
  follow_optimal_bedtime: [
    "Discover your optimal bedtime for a night of restorative sleep that leaves you feeling revitalized each morning.",
    "Adhering to your optimal bedtime can significantly improve sleep quality, boosting your mood and cognitive functions.",
    "Optimize your sleep schedule by finding and sticking to your perfect bedtime, ensuring you get the rest you need to perform at your best.",
  ],
  improve_efficiency: [
    "Maximize your productivity by improving sleep efficiency; quality sleep can enhance your focus, creativity, and problem-solving skills.",
    "Boost your daytime performance by refining your sleep habits to ensure efficient, uninterrupted rest each night.",
    "Improving your sleep efficiency can lead to sharper thinking and increased energy levels, empowering you to achieve more throughout the day.",
  ],
  no_data: [
    "We currently lack sufficient data to provide a personalized sleep recommendation. Consider tracking your sleep habits for more tailored advice.",
    "More sleep data is needed to offer specific recommendations. Keep monitoring your sleep patterns for future insights.",
    "Your sleep data is incomplete. Continue tracking your sleep to unlock personalized tips for better rest.",
  ],
};

const apiTagToInternalTag = {
  "Earlier bedtime": "earlier_bedtime",
  "Follow optimal bedtime": "follow_optimal_bedtime",
  "Improve efficiency": "improve_efficiency",
  "Not enough data for recommendation": "no_data",
};

export const getRandomSleepRecommendation = (apiTag) => {
  const internalTag = apiTagToInternalTag[apiTag];
  const recommendations = sleepRecommendations[internalTag];
  if (recommendations && recommendations.length > 0) {
    const randomIndex = Math.floor(Math.random() * recommendations.length);
    return recommendations[randomIndex];
  } else {
    return "No recommendations available for the provided tag.";
  }
};
