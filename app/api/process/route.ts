export async function POST() {
  console.log("API PROCESS ÇALIŞTI ✔");

  await new Promise((res) => setTimeout(res, 2000));

  return new Response(
    JSON.stringify({
      redirect: "/rapor-hazirlaniyor"
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
