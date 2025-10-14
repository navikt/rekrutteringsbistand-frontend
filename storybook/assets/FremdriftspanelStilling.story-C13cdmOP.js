import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-CUkABeAB.js";import{w as m,c as D}from"./ContextDecorators-CMeFEBRm.js";import{K as b}from"./schema.zod-4I31MbqF.js";import{u as _}from"./useKandidatlisteForEier-BXZv6oPC.js";import{F as y,A as N}from"./FullførtStilling-CAewHjND.js";import{R as T}from"./GjenåpneStillingKnapp-DgGpKtaZ.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-B43AnJP-.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CM6BiwiG.js";import"./OrganisasjonsnummerAlert-C-Pqbviv.js";import"./VStack-8d2bOsTl.js";import"./BasePrimitive-Cpq11D6F.js";import"./List-3dklzM8K.js";import"./Link-CAbsed6V.js";import"./KandidatHendelseTag-DNFfyJYB.js";import"./Tag-D-m_iWzx.js";import"./ChatExclamationmark-JBygFkCd.js";import"./FileXMark-D63Q1V8W.js";import"./Trash-CzSjrRUn.js";import"./HandShakeHeart-BrZJHtMd.js";import"./Calendar-BLD0T8W7.js";import"./ThumbUp-DTlY_Wwa.js";import"./Table-Cix3Up-E.js";import"./util-BvWtTNp-.js";import"./format-BnamQXY9.js";import"./match-ou6qwCdC.js";import"./parseISO-DURtih-t.js";import"./parse-Dh-iiOwK.js";import"./getDefaultOptions-DI-qYsVf.js";import"./util-BG9ROYVH.js";import"./kandidat.mock-DmIK6oev.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-Dx-K6aJy.js";import"./index-D554V1Ay.js";import"./index-OgBvsH7f.js";import"./index-ClNASoAa.js";import"./ChevronDown-WXoNBOJo.js";import"./Box-2klzx0AL.js";import"./Bell-C-MAXcai.js";import"./PersonChat-DdvIEgZ3.js";import"./Eye-2Nwx6v6f.js";import"./ProgressBar-BmnUhK3G.js";import"./oppdaterStilling-CYwgip8A.js";import"./EyeSlash-BxjXVlwJ.js";import"./CircleSlash-Vv1m7zYy.js";import"./Modal-D_9YSfle.js";import"./floating-ui.react-DSapQsXw.js";import"./Date.Input-D5wMcc1z.js";import"./useFormField-EMReCnbG.js";import"./useControllableState-CupVUa9T.js";import"./Modal.context-D39eZ3rC.js";import"./Checkbox-CfG_FYZl.js";import"./Fieldset-BBtI2HQH.js";import"./Pencil-Blw1PpvD.js";import"./PersonbrukerTekst-yJUIS2vN.js";import"./ClockDashed-CVs4tLrJ.js";import"./Tasklist-lCbM6Z7d.js";import"./ErrorBoundary-BNF8jbkt.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Pt as default};
