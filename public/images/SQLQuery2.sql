create proc spEmpSaleByCountry
@ShipCountry nvarchar(50)
as
begin
select Employees.EmployeeID, Employees.FirstName, Employees.LastName, Employees.Title,Employees.Country as [Employee Country], Orders.ShipCountry
from Employees
full join Orders
on Employees.EmployeeID = Orders.EmployeeID
where Orders.ShipCountry = @ShipCountry
end

declare @Ship_Country nvarchar(50);
set @ShipCountry = 'Germany';

EXECUTE SpEmpSaleByCountry @ShipCountry


Employee Sales by Country

1996-07-04 00:00:00.000

@Beginning_Date = N'1996-07-04 00:00:00.000',
		@Ending_Date = N'1996-07-16 00:00:00.000'


