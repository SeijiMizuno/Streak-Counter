/*
 - Create 'users', 'activities' and 'activity_logs' tables
 - BIGINT is a signed 64bits sized number
   - It was used instead of INTEGER for a large range of possible users quantity. The tradeoff is that each id has a larger storage usage.
 - GENERATED ALWAYS AS IDENTITY
   - It allows postgres to generate automaticaly a numeric value for each new user registered.
   - 'ALWAYS' also means that, in normal operations, users cannot set their own id's. It might cause a blank space between id's, like 1, 2, 4, 5. But that's totally normal. 
 - PRIMARY KEY
   - It defines 'id' as an unique value in this table. This means that there will not exist two or more users with the same ID.

 - TEXT: defines the type of this column. This still distinguishes upper and undercase letters.
 - NOT NULL
   - It defines a rule that 'email' is a required data, blocking an user to create an account without giving an text. But it doesn't block user from creating and giving an empty string as an emmail like ''.
 - UNIQUE
   - Also sets this as an unique value

 - TIMESTAMPTZ
   - Is a type of data to storage date and time with time zone.
 - DEFAULT NOW()
   - PostgreSQL sets automaticaly the timestamp of 'NOW()' as a default value (variable data when a value is not given from user or system).

 - REFERENCES table_name(table_column)
   - This sets a foreign key. It means that the value of this column in this table DOES match with the value of the table that is being referenced.

 - CONSTRAINT name_of_constraint
   - It sets a rule for the table. Setting the rule for not recording the another activity_log in the same activity here instead of setting it using the javascript prevents RACE CONDITION

 - CREATE INDEX
   - 
*/
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE activities (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    archived_at TIMESTAMPTZ
);

CREATE TABLE activity_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    activity_id BIGINT NOT NULL REFERENCES activities(id),
    completed_on DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_activity_day
        UNIQUE (activity_id, completed_on)
);

CREATE INDEX idx_activities_user_id
    ON activities(user_id);