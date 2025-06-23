
import { logEvent, setUserProperties } from "firebase/analytics";
import { analytics } from "../../firebaseConfig";

// User engagement tracking
export const trackUserSession = () => {
  try {
    logEvent(analytics, 'session_start', {
      timestamp: new Date().toISOString(),
      page_location: window.location.href
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

// Story engagement tracking
export const trackStoryStart = (storyData) => {
  try {
    logEvent(analytics, 'story_start', {
      story_id: storyData.id,
      story_title: storyData.title,
      story_author: storyData.author,
      story_category: storyData.category,
      story_read_time: storyData.readTime,
      start_time: new Date().toISOString()
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

export const trackStoryComplete = (storyData, readingTime, totalPages) => {
  try {
    logEvent(analytics, 'story_complete', {
      story_id: storyData.id,
      story_title: storyData.title,
      actual_reading_time: readingTime,
      estimated_reading_time: storyData.readTime,
      total_pages: totalPages,
      completion_rate: 100,
      end_time: new Date().toISOString()
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

export const trackStoryProgress = (storyData, currentPage, totalPages, readingTime) => {
  const progressPercent = Math.round((currentPage / totalPages) * 100);
  
  // Track milestone progress (25%, 50%, 75%)
  if (progressPercent === 25 || progressPercent === 50 || progressPercent === 75) {
    try {
      logEvent(analytics, 'story_progress', {
        story_id: storyData.id,
        progress_percent: progressPercent,
        current_page: currentPage,
        total_pages: totalPages,
        reading_time: readingTime
      });
    } catch (error) {
      console.log('Analytics not available:', error);
    }
  }
};

// Social sharing tracking
export const trackSocialShare = (method, storyData, quote = null) => {
  try {
    logEvent(analytics, 'share', {
      method: method, // 'twitter', 'instagram', 'copy_link'
      content_type: quote ? 'quote' : 'story',
      story_id: storyData.id,
      story_title: storyData.title,
      has_quote: !!quote,
      share_time: new Date().toISOString()
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

// User interaction tracking
export const trackUserInteraction = (action, storyData = null, additionalData = {}) => {
  try {
    logEvent(analytics, 'user_interaction', {
      action: action, // 'like', 'bookmark', 'settings_change', 'font_change'
      story_id: storyData?.id || null,
      timestamp: new Date().toISOString(),
      ...additionalData
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

// Reading behavior tracking
export const trackReadingMilestone = (milestone, readingTime, storyId) => {
  try {
    logEvent(analytics, 'reading_milestone', {
      milestone: milestone, // '1_minute', '2_minutes', '5_minutes'
      reading_time: readingTime,
      story_id: storyId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

// User properties tracking
export const setUserPreferences = (preferences) => {
  try {
    setUserProperties(analytics, {
      preferred_font_size: preferences.fontSize || 18,
      preferred_theme: preferences.theme || 'dark',
      device_type: window.innerWidth > 768 ? 'desktop' : 'mobile'
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

// Error tracking
export const trackError = (error, context) => {
  try {
    logEvent(analytics, 'app_error', {
      error_message: error.message,
      error_context: context,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};
