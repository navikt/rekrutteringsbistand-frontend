import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-DLM5HJzs.js";import{w as m,c as D}from"./ContextDecorators-BIVgpaQM.js";import{K as b}from"./schema.zod-Be3GX8ff.js";import{u as _}from"./useKandidatlisteForEier-DgcekaXw.js";import{F as y,A as N}from"./FullførtStilling-8Ot2qHpR.js";import{R as T}from"./GjenåpneStillingKnapp-BG6OUncU.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-CrGxdAfl.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-YgU3m7cz.js";import"./OrganisasjonsnummerAlert-B3pAlU6P.js";import"./VStack-BGMcW3gh.js";import"./BasePrimitive-BbO5zBL-.js";import"./List-0CaM_qXF.js";import"./Link-CPyfir6o.js";import"./KandidatHendelseTag-CbvSE9sM.js";import"./Tag-CEWxUoKE.js";import"./FileXMark-DGFl29ob.js";import"./Trash-BHi_HP9Z.js";import"./HandShakeHeart-CPmZF8O7.js";import"./Calendar-DoFa0WMX.js";import"./ThumbUp-BrAD5jWn.js";import"./Table-DUCgytHE.js";import"./util-CbwIgSqV.js";import"./format-rNpLzPPb.js";import"./match-U-6S0i8L.js";import"./parseISO-DKDnExf9.js";import"./parse-BmrDh6pf.js";import"./getDefaultOptions-C7f7d1ek.js";import"./util-BszRo8_4.js";import"./kandidat.mock-eE2GxmZ_.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-xrp5R5dO.js";import"./index-DR7YIfKH.js";import"./index-CZZGvaHU.js";import"./index-C7mFs1KU.js";import"./ChevronDown-DT6wtO4m.js";import"./Box-Lsij59S8.js";import"./Bell-LjnupXp6.js";import"./PersonChat-rhuIl7kp.js";import"./Eye-CZ3dFi0B.js";import"./ProgressBar-Bx0anlHK.js";import"./oppdaterStilling-PMl69RdL.js";import"./EyeSlash-BLo9pjlV.js";import"./CircleSlash-CuPEp2P1.js";import"./Modal-BVeuo_EE.js";import"./floating-ui.react-B-KeMAa3.js";import"./Date.Input-qr4xnD1C.js";import"./useFormField-DfUHWxa8.js";import"./useControllableState-DwtBjsve.js";import"./Modal.context-D3qE7DPQ.js";import"./Checkbox-DyjTKV6q.js";import"./Fieldset-bnyen4CT.js";import"./Pencil-DyVC0CsE.js";import"./PersonbrukerTekst-DDMeVZhO.js";import"./ClockDashed-DM-PSotF.js";import"./Tasklist-OLq1TftD.js";import"./ErrorBoundary-Crnxo-Z4.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ot as default};
