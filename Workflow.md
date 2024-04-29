### Scenarios - a reminder for myself from previous project

#### Compile

```bash
npm run compile
```
#### Clear Project

```bash
npm run clean
```

#### Build Project

```bash
npm run build
```

### Run CLI test command after build
```bash
./dist/main.cli.js --test
```

### Run test file write after build and mock-server init
```bash
./dist/main.cli.js --getdata ./output/output-data.txt http://localhost:3123/api
```

#### Run REPL

```bash
npm run ts
```

Run `ts-node` to directly run TS code with NodeJS without compiling 

#### Run Project

```bash
npm start
```


