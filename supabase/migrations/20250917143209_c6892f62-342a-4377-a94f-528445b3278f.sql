-- Update experience image URLs to use correct public paths
UPDATE public.experiences 
SET image_url = CASE 
  WHEN image_url LIKE '%experience-diabetes.jpg%' THEN '/images/experience-diabetes.jpg'
  WHEN image_url LIKE '%experience-cancer.jpg%' THEN '/images/experience-cancer.jpg'
  WHEN image_url LIKE '%experience-heart.jpg%' THEN '/images/experience-heart.jpg'
  WHEN image_url LIKE '%experience-mental-health.jpg%' THEN '/images/experience-mental-health.jpg'
  WHEN image_url LIKE '%experience-chronic-pain.jpg%' THEN '/images/experience-chronic-pain.jpg'
  WHEN image_url LIKE '%experience-arthritis.jpg%' THEN '/images/experience-arthritis.jpg'
  ELSE image_url
END
WHERE image_url IS NOT NULL AND image_url LIKE '/src/assets/%';