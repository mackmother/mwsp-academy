# MwSP Academy – Wireframes v1 (Mermaid)

> Quick low-fi wireframes expressed as Mermaid flowcharts so you can preview directly on GitHub without external images. Once approved I’ll replace with polished Figma PNGs.

---

## 1  Dashboard / Homepage
```mermaid
flowchart TB
  A[Hero Carousel / Featured Video]
  B[Category Tabs (Sales • Marketing • Product…)]
  C[Resume Watching Row]
  D[Recommended Row]
  E[New & Popular Row]

  A --> B --> C --> D --> E
```

## 2  Browse Grid
```mermaid
flowchart TB
  F[Filter Bar (Topics • Difficulty • Sort)]
  G[Course Card Grid]
  G -->|Card| G1[Thumbnail]
  G -->|Card| G2[Title + Category]
  G -->|Card| G3[Progress Ring]
```

## 3  Course Player
```mermaid
flowchart LR
  H[Video Player (Aspect 16×9)] --> I[Playback Controls]<-->|Autoplay Next| J[Up Next Overlay]
  H --> K[Lesson Sidebar]
  K --> K1[Module 1]
  K --> K2[Module 2]
  H --> L[Tabs: Overview / Comments / Resources]
```

## 4  Admin Upload
```mermaid
flowchart TB
  M[Drag-and-Drop Uploader]
  M --> N[Progress Bar]
  M --> O[Metadata Form (Title, Desc, Tags)]
  O --> P[Module Organizer (DnD list)]
  P --> Q[Publish / Save Draft Buttons]
```

---

### Next Steps
1. Provide feedback directly in this file (add comments on GitHub).  
2. I’ll iterate and then produce high-fidelity Figma comps matching the approved structure.

*Generated automatically by Cascade.*
