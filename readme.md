<div align="right">
  <img src="https://img.shields.io/github/languages/code-size/saymow/json-to-html.js"/>
  <img src="https://snyk.io/test/github/saymow/json-to-html.js/badge.svg"/>
  <img src="https://img.shields.io/github/release-date-pre/saymow/json-to-html.js"/>
  <a target="_blank" href="https://coveralls.io/github/saymow/json-to-html.js?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/saymow/json-to-html.js/badge.svg?branch=master"></img>
  </a>
  <img alt="Build Workflow" src="https://github.com/saymow/json-to-html.js/actions/workflows/github-actions.yml/badge.svg"></img>
</div>

<h1 align="center">JSON-to-HTML.js</h1>

<p>&nbsp;&nbsp;&nbsp;&nbsp;A <b>simple</b> and <b>totally configurable</b> tool that helps you parse json objects to html. Feel free to get a feel for it on our <a href="https://json-to-html-playground.netlify.app/" target="_blank" alt="Playground url">playground</a>.</p>

## Installation

<p>This is a <a href="https://nodejs.org/en/">Node.js</a> module available through the <a href="https://www.npmjs.com/">npm registry</a>. Installation is done using the <a href="https://docs.npmjs.com/getting-started/installing-npm-packages-locally">npm install command</a>:</p>

```
 npm install json-to-html.js --save
```

## Basic usage:

```typescript
  import JsonToHtmlBuilder from 'json-to-html.js'

  ...

  const jsonToHtml = new JsonToHtmlBuilder(Data, HTMLElement).build()

  jsonToHtml.execute()
```

<p>&nbsp;&nbsp;&nbsp;&nbsp; In order to be configurable, <b>json-to-html.js</b> uses the <a target="_blank" href="https://en.wikipedia.org/wiki/Builder_pattern#:~:text=The%20builder%20pattern%20is%20a,Gang%20of%20Four%20design%20patterns.">builder pattern</a>. So, in the example above, you import the <b>JsonToHtmlBuilder</b>, creates an instance of it, passes the data you want to be converted and the html element in which you're going to append the html result from the parsing, and call the <b>build</b> method, which, in turn, gives you an instance of <b>JsonToHtml</b> ready to be executed, through the method <b>execute</b>.</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp; In this case, as we're not using any <b>custom element creator</b>, thus <b>json-to-html.js</b> fallbacks to its <b>Default Elements factory</b>.</p>

## Concepts

<p>&nbsp;&nbsp;&nbsp;&nbsp; In order to fully understand how the tools works and use its configurable side, its important to understand how data are read and handled by <b>Elements factory</b>. Bellow follows a sample data</p>

```json
{
  "id": "61f99f57cfb6f9db49bfedde",
  "email": "sexton_browning@aquafire.lidl",
  "roles": ["owner", "guest"]
}
```

<p>This sample is seen by the tool this way:</p>

<span style="border: 1px solid yellow; display: block">{<br>
&nbsp;&nbsp;<span style="color:green; font-weight: bold">"id": "61f99f57cfb6f9db49bfedde"</span>,<br>
&nbsp;&nbsp;<span style="color:green; font-weight: bold">"email": "sexton_browning@aquafire.lidl"</span>,<br>
<span style="border: 1px solid blue; display: block">
&nbsp;&nbsp;
<span style="color:rgba(153, 217, 234); font-weight: bold">
"roles"
</span>:
<span style="border: 1px solid yellow; display: block;">
&nbsp;&nbsp;[<br>
&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:red; font-weight: bold">"owner"</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:red; font-weight: bold">"guest"</span><br>
&nbsp;&nbsp;]<br>
</span>
</span>
}</span>

<p>Breaking into pieces:</p>

<div style="border: 1px solid grey">

### <p align="center" style="border: 1px solid yellow;">Container</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp; This element involves every <b>Object</b> or <b>Array</b> in the JSON.</p>

#### CSS classes: <br>

- **base**: base-container<br>
- **when-array**: array<br>
- **when-object**: object

#### - Its construction can be overridden by withCreateContainerEl on building phase

</div>

<div style="border: 1px solid grey">

### <p align="center" style="border: 1px solid blue;">Section</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp; A HTMLElement that involves every object <b> key and value when the value is an Array or an Object</b>.</p>

#### CSS classes: <br>

- **base**: section-container<br>
- **when-array**: array<br>
- **when-object**: object

#### - Its construction can be overridden by withCreateSectionEl on building phase

</div>

<div style="border: 1px solid grey">
  
### <p align="center" style="color:rgba(153, 217, 234);">Section header</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp; A HTMLElement that involves every object <b> key in which value is an Array or an Object</b>.</p>

#### CSS classes: <br>

- **base**: section-header<br>

#### - Its construction can be overridden by withCreateSectionHeaderEl on building phase

</div>

<div style="border: 1px solid grey">

### <p align="center" style="color:green">Field</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp; A HTMLElement that involves every object <b> key-value pair, when the value is a primitive</b>.</p>

#### CSS classes: <br>

- **base**: field-container<br>
- **key element**: key
- **value element**: value

#### - Its construction can be overridden by withCreateFieldEl on building phase

</div>

<div style="border: 1px solid grey">

### <p align="center" style="color:red">Value</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp; A HTMLElement that involves every <b>value without a key</b>, <b>frequently it involves an array item</b>.</p>

#### CSS classes: <br>

- **base**: value<br>

#### - Its construction can be overridden by withCreateValueEl on building phase

</div>

## Advanced usage:

coming soon...