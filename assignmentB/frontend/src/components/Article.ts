// src/components/Article.ts
export type Article = {
  _id?: string;  // MongoDB uses _id
  id?: string;   // In case it's manually set as id
  title: string;
  authors: string[];
  source: string;
  pubyear: number;
  doi: string;
  claim: string;
  evidence: string;
  status: 'submitted' | 'moderated' | 'analyzed'; // Add status field 
  analystClaim?: string;   // Analyst's claim (optional)
  analystEvidence?: string; // Analyst's evidence (optional)with expected values
};
