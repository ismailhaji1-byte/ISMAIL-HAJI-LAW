import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {DatabaseSync} from 'node:sqlite';
test('proposed knowledge schema parses and rejects invented metadata on hypothetical cases',async()=>{
 const db=new DatabaseSync(':memory:');
 db.exec(await readFile('architecture/knowledge.sql','utf8'));
 assert.equal(db.prepare("SELECT count(*) AS n FROM sqlite_master WHERE type = 'table'").get().n,11);
 db.exec("INSERT INTO documents (id,document_type,country,jurisdiction,legal_subject,created_at,updated_at) VALUES ('test','case','Fictional','General education','commercial-law','2026-11-03','2026-11-03')");
 assert.throws(()=>db.exec("INSERT INTO cases (document_id,kind,court,legal_issue,judgment_summary) VALUES ('test','hypothetical','Invented court','Test','Test')"),/CHECK constraint failed/);
 db.exec("INSERT INTO cases (document_id,kind,legal_issue,judgment_summary) VALUES ('test','hypothetical','Test','Test')");
 db.close();
});
