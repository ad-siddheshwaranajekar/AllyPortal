import * as common from "@siddheshwar.anajekar/common-base";

let totalClasses = 0;
let totalInstanceMethods = 0;
let totalStaticMethods = 0;

function getMethods(cls: any) {
  const instance = cls.prototype
    ? Object.getOwnPropertyNames(cls.prototype)
        .filter((m) => m !== "constructor")
        .sort()
    : [];

  const staticMethods = Object.getOwnPropertyNames(cls)
    .filter((m) => !["length", "name", "prototype"].includes(m))
    .sort();

  return { instance, staticMethods };
}

console.log("\n📦 @siddheshwar.anajekar/common-base");
console.log("──────────────────────────────────\n");

Object.entries(common).forEach(([name, value]: any) => {
  if (typeof value !== "function") return;

  totalClasses++;

  const { instance, staticMethods } = getMethods(value);

  totalInstanceMethods += instance.length;
  totalStaticMethods += staticMethods.length;

  const totalForClass = instance.length + staticMethods.length;

  console.log(`🔹 ${name} (${totalForClass} methods)`);

  if (instance.length) {
    console.log(`  • Instance methods (${instance.length})`);
    instance.forEach((m) => console.log(`    - ${m}`));
  }

  if (staticMethods.length) {
    console.log(`  • Static methods (${staticMethods.length})`);
    staticMethods.forEach((m) => console.log(`    - ${m}`));
  }

  console.log("");
});

console.log("──────────────────────────────────");
console.log("📊 Summary");
console.log(`- Classes: ${totalClasses}`);
console.log(`- Instance methods: ${totalInstanceMethods}`);
console.log(`- Static methods: ${totalStaticMethods}`);
console.log(`- Total methods: ${totalInstanceMethods + totalStaticMethods}\n`);
