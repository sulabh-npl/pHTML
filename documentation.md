
# Documentation

Making HTML Programmable via JS just to ease simple webDev for those struggling in JavaScript
## Variables
### Declaration of variable
```html
<var name="" value="" type="">
```
- #### Description
 Assigns or Re-assins variable and type

- #### Attributes
   - ``name='variable name'`` - name of variable 
   - ``value='default value'`` - default value of variable
   - ``type='Data type'`` - data type of variable, ``'number'`` for numbers and ``'text'`` for texts

### Retrival of variable
- ```<print name='variable name'>``` Prints the content of variable
- ```<tag attribute='@variable name'>``` sets the value of variable as attribute's value, `@` is used to identify if the value is variable or not

## Calculation
```
<perform name='destination variable' val1='1st value' val2='2nd value' action='symbol'>
```
- #### Description
    Performs given action between val1 and val2 and saves it in destination variable

- #### Attributes
    - `name='destination variable` - 'destination variable' is the name of number variable in which result is to be stored
    - `val1='1st value'` - 1st value to be calculated
    - `val2='2nd value'` - 2nd value to be calculated
    - `action='symbol'` - specifies symbol of calculation to be performed
        -  accepted values: `+` `-` `*` `/` `%`
- #### Functions
    - `+`: adds val1 and val2
    - `-`: subtracts val2 from val1
    - `*`: multiplies val1 and val2
    - `/`: divides val2 from val1
    - `%`: gives remainder after dividing val2 from val1

## If Else
```
<if val1="" comparision="" val2=""><else></else></if>
```
- #### Description
    - If TRUE - Runs all the codes inside ``<if></if>`` excluding contents of ``<else></else>``
    - If FALSE - Runs only the codes inside ``<if><else></else></if>``

- #### Attributes
    - `val1="input"` - input may be value or variable
    - `comparision="input"` - input can be any of `=` `>` `>=` `<` `<=` `!=`
    - `val2="input"` - input may be value or variable

- #### Working
    - is true if `val1 comparision val2` is true  else false
    if `var1 = 10` `comparision='<'` `var2 = 20` returns  TRUE  
    if `var1 = 10` `comparision='-'` `var2 = 20` returns  FALSE  
## Looping
### Starting Loop
```html
<repeat times=""></repeat>
```
- #### Description
Loops the content of itself

- #### Attributes
``times='number'`` number specifies how many times loop must run

### Break Tag
```
<break></break>
```
- #### Description
breaks just immediate loop if encountered
