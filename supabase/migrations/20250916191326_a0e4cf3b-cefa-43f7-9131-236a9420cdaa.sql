-- Insert sample experiences for different categories with unique slugs
INSERT INTO public.experiences (
  title, 
  summary, 
  content, 
  author_name, 
  category, 
  image_url, 
  status, 
  likes_count,
  slug
) VALUES 
(
  'How I Learned to Manage My Type 2 Diabetes Successfully',
  'After years of struggling with blood sugar control, I discovered a routine that changed my life. Here''s my journey from diagnosis to confidence.',
  '<h2>My Diabetes Journey: From Fear to Freedom</h2>

<p>When I was first diagnosed with Type 2 diabetes at age 45, I felt like my world had collapsed. The doctor''s words echoed in my mind: "You''ll need to completely change your lifestyle." But what seemed impossible at first became the foundation of a healthier, more fulfilling life.</p>

<h3>The Early Struggles</h3>
<p>The first few months were the hardest. I was overwhelmed by:</p>
<ul>
<li>Constant blood sugar monitoring</li>
<li>Medication schedules</li>
<li>Dietary restrictions that felt like punishment</li>
<li>Fear of complications</li>
</ul>

<h3>Finding My Rhythm</h3>
<p>The turning point came when I stopped seeing diabetes as a limitation and started viewing it as a guide to better health. I developed a simple daily routine:</p>

<p><strong>Morning (6:30 AM):</strong><br>
- Check blood sugar<br>
- 20-minute walk<br>
- Balanced breakfast with protein and whole grains</p>

<p><strong>Throughout the Day:</strong><br>
- Regular meal timing<br>
- Healthy snacks every 3-4 hours<br>
- Stay hydrated</p>

<p><strong>Evening:</strong><br>
- Light dinner before 7 PM<br>
- Family walk after dinner<br>
- Blood sugar check before bed</p>

<h3>The Game Changers</h3>
<p>Three things made the biggest difference:</p>

<p><strong>1. Meal Prep Sundays:</strong> I spend 2 hours every Sunday preparing healthy meals for the week. This eliminated the temptation of fast food during busy weekdays.</p>

<p><strong>2. Finding Exercise I Actually Enjoy:</strong> Instead of forcing myself to go to the gym, I discovered I love dancing. I joined a local dance class and now look forward to my workouts.</p>

<p><strong>3. Building a Support Network:</strong> I joined a local diabetes support group. Sharing experiences and tips with others who truly understand has been invaluable.</p>

<h3>My Current Numbers</h3>
<p>After 18 months of consistent lifestyle changes:</p>
<ul>
<li>HbA1c dropped from 9.2% to 6.8%</li>
<li>Lost 35 pounds</li>
<li>Blood pressure normalized</li>
<li>Energy levels significantly improved</li>
</ul>

<h3>Tips for Newly Diagnosed</h3>
<p><strong>Start Small:</strong> Don''t try to change everything at once. I began with just a 10-minute walk after dinner.</p>

<p><strong>Track Everything:</strong> Use apps to monitor blood sugar, food intake, and exercise. The patterns will guide your decisions.</p>

<p><strong>Communicate with Your Healthcare Team:</strong> Regular check-ins helped adjust my treatment plan as my health improved.</p>

<p><strong>Don''t Skip Meals:</strong> Regular eating schedules help maintain stable blood sugar levels.</p>

<p><strong>Prepare for Setbacks:</strong> Some days will be harder than others, and that''s okay. What matters is getting back on track.</p>

<h3>Life Now</h3>
<p>Today, I''m healthier than I''ve been in years. Diabetes taught me to prioritize my health and showed me that I''m stronger than I thought. While I still monitor my blood sugar and take medication, it no longer feels like a burden—it''s simply part of taking care of myself.</p>

<p>To anyone newly diagnosed: this journey is challenging, but you''re more capable than you realize. Take it one day at a time, celebrate small victories, and remember that thousands of us are living full, happy lives with diabetes.</p>

<p><em>Remember to always consult with your healthcare provider before making significant changes to your diabetes management plan.</em></p>',
  'Maria Rodriguez',
  'Diabetes',
  '/src/assets/experience-diabetes.jpg',
  'approved',
  47,
  'managing-type-2-diabetes-successfully'
),
(
  'My Cancer Journey: Finding Strength in Community and Hope',
  'Surviving breast cancer taught me about resilience, the power of support, and how to find joy even in the darkest moments.',
  '<h2>When Life Changes in an Instant</h2>

<p>The phrase "You have cancer" has a way of stopping time. I heard those words on a Tuesday morning in March, and suddenly everything else seemed trivial. At 52, I had always been healthy, active, and optimistic. Cancer wasn''t in my vocabulary—until it became my reality.</p>

<h3>The Diagnosis</h3>
<p>It started with a routine mammogram. The radiologist found something suspicious, leading to more tests, a biopsy, and finally the diagnosis: Stage 2 invasive ductal carcinoma. The next few weeks were a blur of appointments, scans, and treatment planning.</p>

<p>My oncologist, Dr. Sarah Chen, became my lifeline. She explained everything clearly and helped me understand that while the journey would be challenging, my prognosis was good with proper treatment.</p>

<h3>Treatment Plan</h3>
<p>My treatment included:</p>
<ul>
<li>Neoadjuvant chemotherapy (4 cycles)</li>
<li>Lumpectomy</li>
<li>Radiation therapy (25 sessions)</li>
<li>Hormone therapy for 5 years</li>
</ul>

<p>To continue reading the full experience, click on the title above...</p>',
  'Jennifer Walsh',
  'Cancer',
  '/src/assets/experience-cancer.jpg',
  'approved',
  89,
  'cancer-journey-finding-strength-hope'
),
(
  'Living with Heart Disease: My Path to a Stronger Heart',
  'A heart attack at 48 was my wake-up call. Here''s how I rebuilt my life around heart health and discovered I could be stronger than ever.',
  '<h2>The Day Everything Changed</h2>

<p>February 15th started like any other Tuesday. I was rushing to catch the morning train when a crushing pain hit my chest. "Must be stress," I thought, but deep down, I knew something was seriously wrong. Four hours later, I was in the cardiac unit having had a heart attack at just 48 years old.</p>

<p>To continue reading the full experience, click on the title above...</p>',
  'Robert Chen',
  'Heart Disease', 
  '/src/assets/experience-heart.jpg',
  'approved',
  73,
  'living-with-heart-disease-stronger-heart'
),
(
  'Breaking Free from Anxiety: My Mental Health Journey',
  'After years of panic attacks and constant worry, I found tools and strategies that gave me my life back. Here''s what worked for me.',
  '<h2>When Anxiety Took Control</h2>

<p>For most of my twenties, I thought constant worry was just part of my personality. "I''m a planner," I''d tell people. "I like to think ahead." But thinking ahead had become an obsession with worst-case scenarios, and my mind felt like a browser with too many tabs open—all the time.</p>

<p>To continue reading the full experience, click on the title above...</p>',
  'Sarah Kim',
  'Mental Health',
  '/src/assets/experience-mental-health.jpg',
  'approved',
  156,
  'breaking-free-from-anxiety-mental-health'
),
(
  'Managing Chronic Pain: Finding Hope When Everything Hurts',
  'Living with fibromyalgia taught me that healing isn''t always about curing—sometimes it''s about learning to thrive despite challenges.',
  '<h2>When Pain Became My Constant Companion</h2>

<p>It started gradually—a dull ache in my shoulders after long days at the computer, stiffness in the mornings that took longer to shake off. At 35, I attributed it to getting older, stress, or sleeping wrong. But over several months, the pain spread throughout my body and never seemed to leave.</p>

<p>To continue reading the full experience, click on the title above...</p>',
  'Amanda Thompson',
  'Chronic Pain',
  '/src/assets/experience-chronic-pain.jpg',
  'approved',
  94,
  'managing-chronic-pain-finding-hope'
),
(
  'Living Well with Arthritis: Movement, Mindset, and Management',
  'Rheumatoid arthritis changed how I move through the world, but it also taught me the power of adaptation and self-advocacy.',
  '<h2>The Morning Everything Changed</h2>

<p>I woke up on a Monday morning in September and couldn''t make a fist. My hands were swollen, stiff, and painful in a way I''d never experienced. At 42, I''d always been active—running marathons, playing tennis, hiking on weekends. Joint pain wasn''t something I''d ever considered.</p>

<p>To continue reading the full experience, click on the title above...</p>',
  'Michael Davis',
  'Arthritis',
  '/src/assets/experience-arthritis.jpg',
  'approved',
  67,
  'living-well-with-arthritis-movement-management'
);

-- Add some approved comments for these experiences (using the exact slugs)
WITH experience_ids AS (
  SELECT id, slug FROM public.experiences WHERE slug IN (
    'managing-type-2-diabetes-successfully',
    'cancer-journey-finding-strength-hope', 
    'living-with-heart-disease-stronger-heart',
    'breaking-free-from-anxiety-mental-health',
    'managing-chronic-pain-finding-hope',
    'living-well-with-arthritis-movement-management'
  )
)
INSERT INTO public.comments (
  experience_id,
  user_name,  
  comment_text,
  status
) VALUES 
(
  (SELECT id FROM experience_ids WHERE slug = 'managing-type-2-diabetes-successfully'),
  'John Miller',
  'Thank you so much for sharing this, Maria! I was just diagnosed last month and feeling overwhelmed. Your meal prep idea is genius - I''m going to try it this Sunday. It''s encouraging to see someone thriving with diabetes.',
  'approved'
),
(
  (SELECT id FROM experience_ids WHERE slug = 'managing-type-2-diabetes-successfully'),
  'Lisa Wang',
  'Your story gives me so much hope. I''ve been struggling with my blood sugar for months. Can you share what kinds of snacks you found worked best for maintaining stable levels?',
  'approved'
),
(
  (SELECT id FROM experience_ids WHERE slug = 'cancer-journey-finding-strength-hope'),
  'David Rodriguez',
  'Jennifer, your courage is inspiring. My wife was just diagnosed with breast cancer and we''re scared. Reading your story helps us feel less alone. Thank you for sharing something so personal.',
  'approved'
),
(
  (SELECT id FROM experience_ids WHERE slug = 'living-with-heart-disease-stronger-heart'),
  'Patricia Brown',
  'Robert, this is exactly what I needed to read. My husband had a heart attack 6 months ago and we''re both struggling with the lifestyle changes. Your hiking achievement gives us hope that life can be even better than before.',
  'approved'
),
(
  (SELECT id FROM experience_ids WHERE slug = 'breaking-free-from-anxiety-mental-health'),
  'James Anderson',
  'The 4-7-8 breathing technique you mentioned has been a game-changer for me. I used to have panic attacks at work, but this simple tool has helped me regain control. Thank you for being so open about your experience.',
  'approved'
);