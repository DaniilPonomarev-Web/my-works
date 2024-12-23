CREATE TABLE transaction (
    ID UUID,
    AccountID UUID,
    UserID UUID,
    FirstName String,
    ChatID Int64,
    GroupID UUID,
    GroupName String,
    CurrencyID UUID,
    CurrencyName String, 
    CategoryID UUID,
    CategoryName String,
    Value Float32,
    EventDate DateTime,
    EventTime DateTime DEFAULT now()
) ENGINE = MergeTree()
PRIMARY KEY (ID)