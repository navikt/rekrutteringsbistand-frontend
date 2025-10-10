import{f as I,j as t,l as k,S as w,hE as j,hP as u,hQ as x}from"./iframe-CW8P7ZDD.js";import{w as m,c as A}from"./ContextDecorators-CxK81On7.js";import{K as b}from"./schema.zod-DedlLkyY.js";import{u as y}from"./useKandidatlisteForEier-Crx3vl4H.js";import{R as T,F as _,A as N}from"./FullførtStilling-DfjQd0X6.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as E}from"./TilgangskontrollForInnhold-D6zwh8dr.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BNt4D00F.js";import"./OrganisasjonsnummerAlert-COtk6STB.js";import"./VStack-C0LveroH.js";import"./BasePrimitive-LrKddP1X.js";import"./List-C5ud_jms.js";import"./Link-CYWdiJz0.js";import"./KandidatHendelseTag-Dv9fdVNj.js";import"./Tag-GPd71jaQ.js";import"./FileXMark-Cxi9OgYo.js";import"./Trash-CTkszNqu.js";import"./HandShakeHeart-D_9gg13F.js";import"./Calendar-Dd214z57.js";import"./ThumbUp-CVcHopFw.js";import"./Table-CDmQ_lSP.js";import"./util-DuktEjlu.js";import"./format-BGF-tAX-.js";import"./match-Bz7OQ0zI.js";import"./parseISO-CcmPCjvl.js";import"./parse-DnIwr0rg.js";import"./getDefaultOptions-D7nGWO2p.js";import"./util-CK1D1wS9.js";import"./kandidat.mock-Bv0nRdao.js";import"./innsatsgrupper-BqldBv0r.js";import"./index-CbVjSjaj.js";import"./oppdaterStilling-B4W1AaGL.js";import"./Box-WJh-mQoH.js";import"./EyeSlash-DrYGeEZT.js";import"./CircleSlash-BONHtX9p.js";import"./Modal-DsVdsax9.js";import"./floating-ui.react-Dp2W39BI.js";import"./Date.Input-BxC2c25T.js";import"./useFormField-9cHrvR0I.js";import"./useControllableState-lWfKsWES.js";import"./ChevronDown-90OG85yH.js";import"./Modal.context-7M0gvZj4.js";import"./Checkbox-CNcr5KIh.js";import"./Fieldset-DnsgMVGg.js";import"./Pencil-CCDyJFma.js";import"./ClockDashed-DTGgMUFz.js";import"./PersonChat-Ca3ZU4sb.js";import"./Tasklist-CauASMdf.js";import"./accordion-BygDUc64.js";import"./index-ChfE8Kum.js";import"./index-CY1AlTLM.js";import"./index-DxpnBBq6.js";import"./Bell-fibZGBnp.js";import"./Eye-DhCo8sJ-.js";import"./ProgressBar-iu0g4eQG.js";import"./ErrorBoundary-oWPP8YGB.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=y(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(_,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Gt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Gt as default};
