CREATE TABLE IF NOT EXISTS Guestbook (
	MessageId INTEGER PRIMARY KEY,
	MessageTime DATETIME,
	MessageUser TEXT,
	MessageText TEXT
);

CREATE TABLE IF NOT EXISTS Comments (
	CommentId INTEGER PRIMARY KEY,
	PostSlug TEXT NOT NULL,
	CommentTime DATETIME NOT NULL,
	CommentUser TEXT,
	CommentText TEXT NOT NULL,
	CommentReply INTEGER DEFAULT NULL,
	FOREIGN KEY(CommentReply) REFERENCES Comments(CommentID) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_Comments_PostSlug ON Comments(PostSlug)
