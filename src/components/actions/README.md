# Motivation behind "Action" components

In order to maximize performance, I seek to let every page be a React Server Component, which it is by default in
Next.js, unless the "use client" directive is explicitly used. 

In cases where I would have to use the directive on a page,
I simply create an Action component that correctly shows the correct content on the page and uses the directive.
