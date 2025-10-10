import{j as t,e as k}from"./iframe-WlOW16KT.js";import{w as m,c as D}from"./ContextDecorators-Bn_HLXlk.js";import{K as I}from"./schema.zod-B24I9o_r.js";import{u as w}from"./useKandidatlisteForEier-DIJPmOW2.js";import{a as j}from"./StillingsContext-BX8ONHb7.js";import{R as T,F as x,A as b}from"./FullførtStilling-WeJd_XZ1.js";import{K as g,I as y}from"./KandidatTyper-CkRsvxsW.js";import{a as _}from"./stilling-typer-DLlwa7NU.js";import{S as N}from"./SWRLaster-BVqtMFKJ.js";import{T as A}from"./TilgangskontrollForInnhold-DDwMs_La.js";import{m as u,a as v}from"./stillingMock-BtxAEQoL.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CONyjdyI.js";import"./OrganisasjonsnummerAlert-YUoWQBHa.js";import"./VStack-DOF5c85d.js";import"./BasePrimitive-D_E869Ly.js";import"./List-DnWEJrOY.js";import"./Link-BMPYEf3M.js";import"./KandidatHendelseTag-Cm8onx4V.js";import"./Tag-CiLo6Qvb.js";import"./FileXMark-DBQzcoy9.js";import"./Trash-DDTWPXzn.js";import"./HandShakeHeart-DjnOpuQw.js";import"./Calendar-Db467AUg.js";import"./ThumbUp-C9qL4nzY.js";import"./Table-B_eAAvaS.js";import"./util-JGHCy8PM.js";import"./format-lmga2jL-.js";import"./startOfDay-lTP3GKUn.js";import"./match-CItYnUcs.js";import"./parseISO-DJIM71K9.js";import"./parse-DIblDuu1.js";import"./getDefaultOptions-CqbKhm2h.js";import"./util-eRQ1H9rL.js";import"./kandidat.mock-F3wnuv6n.js";import"./innsatsgrupper-BqldBv0r.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./index-BQkw8ygk.js";import"./index-CDp5tk2I.js";import"./index-CibxlY9n.js";import"./stilling.dto-CoZWRjru.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./oppdaterStilling-BzAZAS0M.js";import"./Box-8dtc84EN.js";import"./EyeSlash-DhkDb9uf.js";import"./CircleSlash-UMex7LWz.js";import"./Modal-qtWpECVq.js";import"./floating-ui.react-DtbDoruD.js";import"./Date.Input-CTWCdr_T.js";import"./useFormField-DD8Yv9fI.js";import"./useControllableState-CCA-pbh4.js";import"./ChevronDown-kr8OAsaw.js";import"./Modal.context-CPaeYima.js";import"./Checkbox-CogICWTj.js";import"./Fieldset-Bfuc0x2E.js";import"./Pencil-iBbWK6HY.js";import"./ClockDashed-BPg4kjl9.js";import"./PersonChat-n6kGGOx-.js";import"./Tasklist-c-axhpQG.js";import"./accordion-C9TtpmCp.js";import"./index-CSXQMVcW.js";import"./index-Dm_UJLIS.js";import"./index-C_AnjH2V.js";import"./Bell-DzRryBbI.js";import"./Eye-FTRmYHxJ.js";import"./ProgressBar-CAYBtVH_.js";import"./Feilmelding-4HUNkcbf.js";import"./CopyButton-BzrJWFs_.js";import"./Checkmark-BzyWZ4Ad.js";import"./Sidelaster-CN63qN-4.js";import"./ErrorBoundary-DDWgLHZ3.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=j(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(N,{hooks:[d],children:e=>{const F=e.status===I.Lukket&&i.stilling.status===_.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+R;return F?t.jsx(x,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(b,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const ti={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=v,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,ti as default};
