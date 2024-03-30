SELECT csm.title, csm.type,
		DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, 
		COUNT(*) as numComponents 
FROM ContainsStudyMaterial csm, OwnsQuizQuestion oqq
WHERE oqq.studyMatTitle = csm.title AND oqq.topicId = csm.topicId AND 
	  csm.topicId = ?
GROUP BY csm.title, csm.type, lastOpened
ORDER BY lastOpened ASC;

SELECT csm.title, csm.type, 
		DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, 
        COUNT(*) as numComponents
FROM ContainsStudyMaterial csm, OwnsCard oc 
WHERE oc.studyMatTitle = csm.title AND oc.topicId = csm.topicId AND 
	  csm.topicId = ?
GROUP BY csm.title, csm.type, lastOpened
ORDER BY title ASC;

SELECT csm.title, csm.type, 
		DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, 
        COUNT(*) as numComponents
FROM ContainsStudyMaterial csm
WHERE  csm.type = 'Notes' AND csm.topicId = ?
GROUP BY csm.title, csm.type, lastOpened
ORDER BY title ASC;

SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm, OwnsQuizQuestion oqq WHERE oqq.studyMatTitle = csm.title AND oqq.topicId = csm.topicId AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY lastOpened ASC;

SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm, OwnsCard oc WHERE oc.studyMatTitle = csm.title AND oc.topicId = csm.topicId AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY lastOpened ASC;

SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm, OwnsCard oc WHERE oc.studyMatTitle = csm.title AND oc.topicId = csm.topicId AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY title ASC;

SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm WHERE  csm.type = 'Notes' AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY lastOpened ASC;

SELECT csm.title, csm.type, DATE_FORMAT(csm.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm WHERE  csm.type = 'Notes' AND csm.topicId = ? GROUP BY csm.title, csm.type, lastOpened ORDER BY title ASC;

SELECT csm1.title, csm1.type, DATE_FORMAT(csm1.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm1, OwnsQuizQuestion oqq WHERE oqq.studyMatTitle = csm1.title AND oqq.topicId = csm1.topicId AND csm1.topicId = ? GROUP BY csm1.title, csm1.type, lastOpened UNION SELECT csm2.title, csm2.type, DATE_FORMAT(csm2.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm2, OwnsCard oc WHERE oc.studyMatTitle = csm2.title AND oc.topicId = csm2.topicId AND csm2.topicId = ? GROUP BY csm2.title, csm2.type, lastOpened UNION SELECT csm3.title, csm3.type, DATE_FORMAT(csm3.lastOpened, '%M %d, %Y') AS lastOpened, COUNT(*) as numComponents FROM ContainsStudyMaterial csm3 WHERE  csm3.type = 'Notes' AND csm3.topicId = ? GROUP BY csm3.title, csm3.type, lastOpened ORDER BY lastOpened ASC;