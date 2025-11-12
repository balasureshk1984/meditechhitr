# 🔄 Job Update Guide for MediTech Hire Website

## 📝 **How to Update Job Listings**

### **Step 1: Open the HTML File**
1. Open `index.html` in VS Code
2. Find the `<!-- Jobs Section -->` (around line 232)
3. Look for `<div class="jobs-grid">` section

### **Step 2: Job Card Template**
Copy this template for new jobs:

```html
<div class="job-card" data-category="CATEGORY_HERE">
    <div class="job-header">
        <h3>JOB_TITLE_HERE</h3>
        <span class="job-type">EMPLOYMENT_TYPE</span>
    </div>
    <div class="job-details">
        <p class="job-company">COMPANY_NAME</p>
        <p class="job-location">📍 LOCATION</p>
        <p class="job-salary">💰 SALARY_RANGE</p>
    </div>
    <p class="job-description">
        JOB_DESCRIPTION_HERE
    </p>
    <div class="job-tags">
        <span class="tag">SKILL_1</span>
        <span class="tag">SKILL_2</span>
        <span class="tag">SKILL_3</span>
    </div>
    <a href="mailto:info@meditechhire.com" class="btn btn-outline">Apply Now</a>
</div>
```

### **Step 3: Fill in the Details**

#### **Categories** (for filtering):
- `medical` - Medical/Healthcare jobs
- `technical` - IT/Software jobs  
- `remote` - Remote positions
- `medical technical` - Jobs that fit both categories

#### **Employment Types**:
- `Full-time`
- `Part-time` 
- `Contract`
- `Remote`
- `Internship`

#### **Example: Adding a New Job**

```html
<div class="job-card" data-category="technical">
    <div class="job-header">
        <h3>React Developer</h3>
        <span class="job-type">Full-time</span>
    </div>
    <div class="job-details">
        <p class="job-company">Tech Solutions Pvt Ltd</p>
        <p class="job-location">📍 Mumbai, India</p>
        <p class="job-salary">💰 ₹8L - ₹15L per annum</p>
    </div>
    <p class="job-description">
        Experienced React developers needed for building modern web applications with Redux and TypeScript.
    </p>
    <div class="job-tags">
        <span class="tag">React</span>
        <span class="tag">Redux</span>
        <span class="tag">TypeScript</span>
    </div>
    <a href="mailto:info@meditechhire.com" class="btn btn-outline">Apply Now</a>
</div>
```

### **Step 4: Remove Old Jobs**
- Find the job card you want to remove
- Delete the entire `<div class="job-card">...</div>` block

### **Step 5: Update the Website**
After making changes:

```bash
# In VS Code terminal:
git add index.html
git commit -m "Updated job listings - added [JOB_TITLE]"
git push origin main
```

The website will automatically update in 2-3 minutes!

---

## 🗂️ **File Purpose Explanation**

### **Essential Files** (Don't Delete):
- ✅ `index.html` - Main website
- ✅ `styles.css` - Website styling  
- ✅ `script.js` - Interactive features
- ✅ `.github/workflows/deploy.yml` - Auto-deployment

### **Optional Files** (Can Remove):
- 🔧 `demo.html` - Client presentation page (delete if not needed)
- 🔧 `package.json` - Development tools (keep for professional appearance)
- 📝 `README.md` - Documentation (keep for reference)
- 📝 `DEPLOYMENT_GUIDE.md` - Setup instructions (delete after setup)

### **To Remove Demo Page**:
If you don't want the demo page:
```bash
git rm demo.html
git commit -m "Removed demo page"
git push origin main
```

---

## 🎯 **Quick Job Update Examples**

### **Medical Job Example**:
```html
<div class="job-card" data-category="medical">
    <div class="job-header">
        <h3>Radiologist</h3>
        <span class="job-type">Full-time</span>
    </div>
    <div class="job-details">
        <p class="job-company">Apollo Hospitals</p>
        <p class="job-location">📍 Chennai, India</p>
        <p class="job-salary">💰 ₹25L - ₹40L per annum</p>
    </div>
    <p class="job-description">
        Experienced radiologist needed for diagnostic imaging and reporting in multi-specialty hospital.
    </p>
    <div class="job-tags">
        <span class="tag">Radiology</span>
        <span class="tag">MBBS</span>
        <span class="tag">MD</span>
    </div>
    <a href="mailto:info@meditechhire.com" class="btn btn-outline">Apply Now</a>
</div>
```

### **Technical Job Example**:
```html
<div class="job-card" data-category="technical remote">
    <div class="job-header">
        <h3>Cloud Architect</h3>
        <span class="job-type">Remote</span>
    </div>
    <div class="job-details">
        <p class="job-company">CloudTech Solutions</p>
        <p class="job-location">📍 Remote, India</p>
        <p class="job-salary">💰 ₹20L - ₹35L per annum</p>
    </div>
    <p class="job-description">
        Senior cloud architect needed for AWS infrastructure design and implementation.
    </p>
    <div class="job-tags">
        <span class="tag">AWS</span>
        <span class="tag">DevOps</span>
        <span class="tag">Remote</span>
    </div>
    <a href="mailto:info@meditechhire.com" class="btn btn-outline">Apply Now</a>
</div>
```

---

## 🚀 **Quick Commands**

### **Add New Job**:
1. Copy template above
2. Replace placeholder text
3. Add to `jobs-grid` section in `index.html`
4. Save and push to GitHub

### **Remove Job**:
1. Find job card in `index.html`
2. Delete entire `<div class="job-card">...</div>`
3. Save and push to GitHub

### **Update Contact Email**:
Find `info@meditechhire.com` and replace with new email if needed.

**Your website updates automatically within 2-3 minutes of pushing changes!** 🎉