import {EMAIL_REF, MENU_ITEMS, THEME} from "./constants";
import {MenuItem} from "./types";

describe("MENU_ITEMS", () => {
    it("should be an array of MenuItem objects", () => {
        expect(Array.isArray(MENU_ITEMS)).toBe(true);

        MENU_ITEMS.forEach((item) => {
            expect(item).toHaveProperty("href");
            expect(item).toHaveProperty("title");
            expect(typeof item.href).toBe("string");
            expect(typeof item.title).toBe("string");
        });
    });

    it("should contain expected menu items", () => {
        const expectedItems: MenuItem[] = [
            {href: "about", title: "ABOUT"},
            {href: "experiences", title: "EXPERIENCES"},
            {href: "technologies", title: "TECHNOLOGIES"},
            {href: "contacts", title: "CONTACTS"},
        ];

        expect(MENU_ITEMS).toEqual(expectedItems);
    });
});

describe("EMAIL_REF", () => {
    it("should be a valid mailto link", () => {
        expect(typeof EMAIL_REF).toBe("string");
        expect(EMAIL_REF.startsWith("mailto:")).toBe(true);
    });

    it("should contain a valid email address", () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = EMAIL_REF.replace("mailto:", "");

        expect(emailPattern.test(email)).toBe(true);
    });

    it("should match the expected email address", () => {
        expect(EMAIL_REF).toBe("mailto:gariboldipaolopaolo@gmail.com");
    });
});

describe("THEME", () => {
    it("should be an object with LIGHT and DARK properties", () => {
        expect(typeof THEME).toBe("object");
        expect(THEME).toHaveProperty("LIGHT", "light");
        expect(THEME).toHaveProperty("DARK", "dark");
    });

    it("should only contain the expected keys", () => {
        const expectedKeys = ["LIGHT", "DARK"];
        expect(Object.keys(THEME)).toEqual(expectedKeys);
    });

    it("should only contain valid string values", () => {
        Object.values(THEME).forEach((value) => {
            expect(typeof value).toBe("string");
        });
    });
});
