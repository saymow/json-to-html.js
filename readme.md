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

## Basic usage:

```typescript
  import JsonToHtmlBuilder from 'json-to-html.js'

  ...

  const jsonToHtml = new JsonToHtmlBuilder(Data, HTMLElement).build()
  
  jsonToHtml.execute()
```

<p>&nbsp;&nbsp;&nbsp;&nbsp; In order to be configurable, <b>json-to-html.js</b> uses the <a target="_blank" href="https://en.wikipedia.org/wiki/Builder_pattern#:~:text=The%20builder%20pattern%20is%20a,Gang%20of%20Four%20design%20patterns.">builder pattern</a>. So, in the example above, you import the <b>JsonToHtmlBuilder</b>, creates an instance of it, passes the data you want to be converted and the html element in which you're going to append the html result from the parsing, and call the <b>build</b> method, which, in turn, gives you an instance of <b>JsonToHtml</b> ready to be executed, through the method <b>execute</b>.</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp; In this case, as we're not using any <b>custom element creator</b>, thus <b>json-to-html.js</b> fallbacks to its <b>Default Elements factory</b>.</p>
 

