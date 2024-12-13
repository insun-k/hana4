select sum(salary) from Emp;
select cast(str_to_date('2019-11-22', '%Y-%m-%dd') as date);
select date_format('2019-11-22', '%Y-%m-%dd');

select dname, HEX(aes_encrypt(dname, '암호키')) from Dept;  -- 암호화
select dname, aes_encrypt(dname, '암호키') from Dept;

select sub.*, CAST(aes_decrypt(UNHEX(sub.enc), '암호키') as char)  -- 복호화
from (select dname, HEX(aes_encrypt(dname, '암호키')) enc from Dept) sub;

select dept, group_concat(ename)
  from Emp group by dept;
  
select concat('abc', ':', 'efg', ':', null, ':', 'hij') as concat,
	   concat_ws(':','abc','efg', null, 'hij') as concat_ws;
  
select ifnull(captain, '공석'), if(captain is null, '공석', captain) from Dept;

select elt(2, 'str1', 'str2', 'str3'), field('s1','s1','s2');

select substring('abcdefg', 2, 3);
select substring_index('a,b,c,d',',',2);
select substring_index(substring_index('a,b,c,d',',',3), ',', -1);