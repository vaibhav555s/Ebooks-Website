
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebaseConfig";

// Story submission tracking
export const trackStorySubmission = (email, storyLength, submissionTime) => {
  try {
    logEvent(analytics, 'story_submission', {
      user_email_provided: !!email,
      story_idea_length: storyLength,
      submission_time: submissionTime,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

// Developer contribution tracking
export const trackDeveloperInterest = (actionType, source) => {
  try {
    logEvent(analytics, 'developer_interest', {
      action_type: actionType, // 'github_click', 'email_click', 'form_submit'
      source: source, // 'footer', 'community_section', 'floating_cta'
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

// Community engagement tracking
export const trackCommunityEngagement = (engagementType, section, additionalData = {}) => {
  try {
    logEvent(analytics, 'community_engagement', {
      engagement_type: engagementType, // 'form_view', 'section_scroll', 'cta_click'
      section: section, // 'story_submission', 'developer_contribution'
      timestamp: new Date().toISOString(),
      ...additionalData
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

// Floating CTA tracking
export const trackFloatingCTA = (action) => {
  try {
    logEvent(analytics, 'floating_cta_interaction', {
      action: action, // 'show', 'click', 'dismiss'
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};
