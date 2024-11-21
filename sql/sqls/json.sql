select row_number() over(order by dept, salary desc) 'No', 
	rank() over(partition by dept order by dept, salary desc),
	e.*
	from Emp e
  where e.ename like '박%';
  
  
-- JSON
select * from Emp;
alter table Emp add column remark json;

select * from Emp where id < 5;
update Emp set remark = '{"id" : 1, "age": 30, "fam": [{"id": 1, "name": "유세차"}]}'
  where id = 2;

update Emp set remark = '{"id" : 3, "age": 33, "fam": [{"id": 1, "name": "유세차"}, {"id": 2, "name": "유세진"}]}'
  where id = 3;

update Emp set remark = '{"id" : 4, "age": 34, "fam": [{"id": 1, "name": "유세차"}]}'
  where id = 4;
  
select id, ename, remark, remark-> '$.age', remark-> '$.fam' as family,
	json_pretty(remark), remark -> '$.fam[0]'
  from Emp where id < 5;
  
select json_valid('{"id":1}');

select * from Emp where remark-> '$.age' > 30;