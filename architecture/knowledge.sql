-- Proposed future schema only. No database is created or connected by the website.
-- SQL uses SQLite-compatible types as a portable design reference.
PRAGMA foreign_keys = ON;
CREATE TABLE documents (
 id TEXT PRIMARY KEY,
 document_type TEXT NOT NULL CHECK(document_type IN ('case','legislation','article','news','publication','resource')),
 country TEXT NOT NULL,
 jurisdiction TEXT NOT NULL,
 legal_subject TEXT NOT NULL,
 review_status TEXT NOT NULL DEFAULT 'draft',
 current_law_status TEXT NOT NULL DEFAULT 'unknown',
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
CREATE TABLE editions (
 id TEXT PRIMARY KEY,
 document_id TEXT NOT NULL REFERENCES documents(id),
 language TEXT NOT NULL, -- Original document language; website interface remains English
 revision INTEGER NOT NULL,
 title TEXT NOT NULL,
 summary TEXT NOT NULL,
 content TEXT NOT NULL,
 slug TEXT NOT NULL UNIQUE,
 seo_title TEXT,
 seo_description TEXT,
 original_text_review_status TEXT NOT NULL DEFAULT 'pending',
 UNIQUE(document_id,language,revision)
);
CREATE TABLE cases (
 document_id TEXT PRIMARY KEY REFERENCES documents(id),
 kind TEXT NOT NULL CHECK(kind IN ('judgment','educational-study','hypothetical')),
 court TEXT,
 case_number TEXT,
 decision_date TEXT,
 official_citation TEXT,
 legal_issue TEXT NOT NULL,
 applicable_law TEXT,
 judgment_summary TEXT NOT NULL,
 legal_principles TEXT,
 verification_status TEXT NOT NULL DEFAULT 'unverified',
 CHECK(kind != 'hypothetical' OR (court IS NULL AND case_number IS NULL AND decision_date IS NULL))
);
CREATE TABLE legislation (
 document_id TEXT PRIMARY KEY REFERENCES documents(id),
 law_number TEXT,
 date_enacted TEXT,
 effective_date TEXT,
 current_status TEXT NOT NULL DEFAULT 'unknown',
 version_description TEXT NOT NULL,
 supersedes_document_id TEXT REFERENCES documents(id),
 status_evidence_source_id TEXT REFERENCES sources(id)
);
CREATE TABLE articles (
 document_id TEXT PRIMARY KEY REFERENCES documents(id),
 author TEXT,
 author_approval_status TEXT NOT NULL DEFAULT 'pending',
 category TEXT NOT NULL,
 publication_date TEXT,
 prepared_date TEXT NOT NULL,
 review_status TEXT NOT NULL DEFAULT 'draft'
);
CREATE TABLE sources (
 id TEXT PRIMARY KEY,
 title TEXT NOT NULL,
 publisher TEXT NOT NULL,
 original_url TEXT NOT NULL,
 retrieved_url TEXT,
 country TEXT NOT NULL,
 jurisdiction TEXT NOT NULL,
 source_language TEXT,
 publication_date TEXT,
 retrieved_at TEXT,
 content_hash TEXT,
 access_status TEXT NOT NULL DEFAULT 'unknown',
 rights_basis TEXT,
 limitations TEXT
);
CREATE TABLE citations (
 id TEXT PRIMARY KEY,
 edition_id TEXT NOT NULL REFERENCES editions(id),
 source_id TEXT NOT NULL REFERENCES sources(id),
 claim TEXT NOT NULL,
 supporting_passage TEXT,
 page_or_paragraph TEXT,
 identity_status TEXT NOT NULL DEFAULT 'pending',
 support_status TEXT NOT NULL DEFAULT 'pending',
 jurisdiction_status TEXT NOT NULL DEFAULT 'pending',
 currency_status TEXT NOT NULL DEFAULT 'unknown',
 reviewer TEXT,
 reviewed_at TEXT
);
CREATE TABLE reviews (
 id TEXT PRIMARY KEY,
 edition_id TEXT NOT NULL REFERENCES editions(id),
 stage TEXT NOT NULL CHECK(stage IN ('source','legal','original-document','owner')),
 reviewer TEXT NOT NULL,
 decision TEXT NOT NULL CHECK(decision IN ('approved','changes-required','rejected')),
 rationale TEXT NOT NULL,
 reviewed_at TEXT NOT NULL
);
CREATE TABLE relationships (
 from_document_id TEXT REFERENCES documents(id),
 to_document_id TEXT REFERENCES documents(id),
 relationship TEXT NOT NULL,
 PRIMARY KEY(from_document_id,to_document_id,relationship)
);
CREATE TABLE retrieval_chunks (
 id TEXT PRIMARY KEY,
 edition_id TEXT NOT NULL REFERENCES editions(id),
 source_id TEXT NOT NULL REFERENCES sources(id),
 locator TEXT NOT NULL,
 content TEXT NOT NULL,
 content_hash TEXT NOT NULL,
 approved_for_retrieval INTEGER NOT NULL DEFAULT 0,
 embedding_reference TEXT
);
CREATE TABLE audit_events (
 id TEXT PRIMARY KEY,
 actor TEXT NOT NULL,
 action TEXT NOT NULL,
 record_id TEXT NOT NULL,
 revision INTEGER,
 event_at TEXT NOT NULL,
 -- Do not place confidential legal questions or credentials here.
 note TEXT
);
