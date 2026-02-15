import { apiClient } from './apiClient';
import { ApiError, normalizeApiError } from './apiErrors';

function profileLink(platform, username) {
  const key = platform.toLowerCase();
  if (key.includes('linkedin')) return `https://linkedin.com/in/${username}`;
  if (key.includes('github')) return `https://github.com/${username}`;
  if (key.includes('leetcode')) return `https://leetcode.com/${username}`;
  if (key.includes('geeksforgeeks')) return `https://geeksforgeeks.org/user/${username}`;
  return '-';
}

export async function scanFace(imageFile) {
  try {
    if (!imageFile) {
      throw new ApiError('Upload an image before scanning.', { status: 400, code: 'MISSING_FILE' });
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    const { data } = await apiClient.post('/upload-face', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return {
      matched_profiles: data.matched_profiles || [],
      faces_detected: data.faces_detected ?? 0,
      fake_detection_confidence: data.fake_detection_confidence ?? 0,
      fake_detection_label: data.fake_detection_label || 'Unknown',
      anti_spoof_model: data.anti_spoof_model || 'unknown',
      signals: data.signals || {}
    };
  } catch (error) {
    throw normalizeApiError(error, 'Failed to run face scan.');
  }
}

export async function scanUsername(username) {
  try {
    const { data } = await apiClient.post('/scan-username', { username });
    const rows = data.results || [];

    return rows.map((row) => ({
      platform: row.platform,
      username,
      status: row.status,
      link: row.status === 'Found' ? row.profile_url || profileLink(row.platform, username) : '-'
    }));
  } catch (error) {
    throw normalizeApiError(error, 'Failed to scan username across platforms.');
  }
}

export async function searchResearch(name, institution) {
  try {
    const { data } = await apiClient.post('/search-research', { full_name: name, institution });
    const papers = data.papers || [];

    return papers.map((paper) => ({
      title: paper.title,
      authors: paper.authors || `${name}, Co-authors`,
      source: paper.source,
      year: paper.year,
      citations: paper.citations,
      institution
    }));
  } catch (error) {
    throw normalizeApiError(error, 'Failed to fetch research records.');
  }
}

export async function checkBreach(email) {
  try {
    const { data } = await apiClient.post('/check-breach', { email });
    if (data.status === 'api-key-missing') {
      throw new ApiError('Breach API key is not configured on backend (HIBP_API_KEY).', { status: 503, code: 'CONFIG_MISSING' });
    }
    if (data.status === 'auth-error') {
      throw new ApiError('HIBP API key is invalid or expired.', { status: 401, code: 'UPSTREAM_AUTH' });
    }
    if (data.status === 'rate-limited') {
      throw new ApiError('HIBP rate limit reached. Try again later.', { status: 429, code: 'RATE_LIMITED' });
    }
    const breaches = data.breaches || [];
    return breaches.map((row) => ({ ...row, email }));
  } catch (error) {
    throw normalizeApiError(error, 'Failed to check breach exposure.');
  }
}

export async function calculateRisk() {
  try {
    const { data } = await apiClient.post('/calculate-risk');
    return {
      score: data.score ?? 0,
      vector: data.vector || [0, 0, 0, 0],
      tips: data.tips || [
        'Enable MFA across all recovered accounts.',
        'Remove stale public profiles without activity.',
        'Rotate credentials exposed in historical breaches.'
      ]
    };
  } catch (error) {
    throw normalizeApiError(error, 'Failed to calculate exposure score.');
  }
}

export async function graphData() {
  try {
    const { data } = await apiClient.get('/graph-data');
    return {
      nodes: data.nodes || [],
      edges: data.edges || [],
      summary: data.summary || { nodes: 0, edges: 0, events_ingested: 0 }
    };
  } catch (error) {
    throw normalizeApiError(error, 'Failed to load graph data.');
  }
}

export async function getSettings() {
  try {
    const { data } = await apiClient.get('/settings');
    return data.settings;
  } catch (error) {
    throw normalizeApiError(error, 'Failed to load settings.');
  }
}

export async function saveSettings(settings) {
  try {
    const { data } = await apiClient.put('/settings', settings);
    return data.settings;
  } catch (error) {
    throw normalizeApiError(error, 'Failed to save settings.');
  }
}

export async function deleteAccount() {
  try {
    const { data } = await apiClient.delete('/account');
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Failed to delete account.');
  }
}

export async function exportPdfReport() {
  try {
    const response = await apiClient.get('/report/export/pdf', { responseType: 'blob' });
    return response.data;
  } catch (error) {
    throw normalizeApiError(error, 'Failed to export report.');
  }
}

export async function scrapeAggregate(payload) {
  try {
    const { data } = await apiClient.post('/scrape-aggregate', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Failed to run scraping pipeline.');
  }
}

export async function enqueueScrapeJob(payload) {
  try {
    const { data } = await apiClient.post('/jobs/scrape', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Failed to enqueue scrape job.');
  }
}

export async function listScrapeJobs() {
  try {
    const { data } = await apiClient.get('/jobs/scrape');
    return data.jobs || [];
  } catch (error) {
    throw normalizeApiError(error, 'Failed to load scrape jobs.');
  }
}

export async function listCrawlerSchedules() {
  try {
    const { data } = await apiClient.get('/crawler/schedules');
    return data.schedules || [];
  } catch (error) {
    throw normalizeApiError(error, 'Failed to load crawler schedules.');
  }
}

export async function createCrawlerSchedule(payload) {
  try {
    const { data } = await apiClient.post('/crawler/schedules', payload);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Failed to create crawler schedule.');
  }
}

export async function deleteCrawlerSchedule(scheduleId) {
  try {
    const { data } = await apiClient.delete(`/crawler/schedules/${scheduleId}`);
    return data;
  } catch (error) {
    throw normalizeApiError(error, 'Failed to delete crawler schedule.');
  }
}

export async function getReportHistory() {
  try {
    const { data } = await apiClient.get('/report/history');
    return data.events || [];
  } catch (error) {
    throw normalizeApiError(error, 'Failed to load report history.');
  }
}

export async function getAuditEvents() {
  try {
    const { data } = await apiClient.get('/audit/events');
    return data.events || [];
  } catch (error) {
    throw normalizeApiError(error, 'Failed to load audit events.');
  }
}
